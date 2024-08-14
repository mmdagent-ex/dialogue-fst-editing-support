const vscode = require('vscode');
const fs = require('fs');
const path = require('path')

const commandsJsonPath = path.join(__dirname, 'commands.json')

const FST_MODE = { scheme: 'file', language: 'fst' };

let diagnosticCollection = null;

// load command completions
let completionItemsEvent = [];
let completionItemsCommand = [];
let commandList = [];

function loadCommandList() {
   return new Promise((resolve, reject) => {
      fs.readFile(commandsJsonPath, 'utf8', (err, data) => {
         if (err) {
               console.error('Error reading file:', err);
               return;
         }
         try {
               const commands = JSON.parse(data);       
               commands.forEach(command => {
                  if (command.label === 'event') {
                     completionItemsEvent.push({
                        label: command.name,
                        kind: vscode.CompletionItemKind.Event
                     });
                  } else if (command.label === 'command') {
                     completionItemsCommand.push({
                        label: command.name,
                        kind: vscode.CompletionItemKind.Method
                     });
                  }
               });
               commandList = commands.map(command => ({
                  name: command.name,
                  label: command.format,
                  doc: command.doc
               }));
               resolve(commandList);
         } catch (err) {
               console.error('Error parsing JSON:', err);
         }
      });
   });
}

// Event/Command completion
class FstCompletionItemProvider {
   provideCompletionItems(document, position, token) {
      const completionItemsEps = [
         {label: 'eps>', kind: vscode.CompletionItemKind.Interface}
      ];
      const linePrefix2 = document.lineAt(position).text.substr(0, position.character);
      if (linePrefix2.endsWith("<")) {
      let completionList = new vscode.CompletionList(completionItemsEps, false);
      return Promise.resolve(completionList);
      }
      const linePrefix = document.lineAt(position).text.substr(0, position.character - 1);
      if (linePrefix.match(/^(\w+\s+\w+\s+|\s+)([^ \t]+)[ \t]+$/)) {
         let completionList = new vscode.CompletionList(completionItemsCommand, false);
         return Promise.resolve(completionList);
      } else if (linePrefix.match(/^(\w+\s+\w+\s+|\s+)[^\|]*$/g)) {
         let completionList = new vscode.CompletionList(completionItemsEvent, false);
         return Promise.resolve(completionList);
      }
      return Promise.reject();
   }
}

// Signature help for each command/event
class FstSignatureHelpProvider {
   provideSignatureHelp(document, position, token) {
      const line = document.lineAt(position.line);
      if (!line.text.substr(0, position.character).match(/\|/)) return vscode.reject('no open parenthesis before cursor');

      const command = line.text.substr(0, position.character).match(/([^\|\s]+)\|\S*$/)[1];
      const com2 = line.text.substr(0, position.character).match(/\S+$/)[0];
      const count = (com2.match(/\|/g) || []).length;

      const signatureHelp = new vscode.SignatureHelp();
      signatureHelp.activeParameter = count - 1;
      signatureHelp.activeSignature = 0;

      const entry = commandList.find((v) => v.name == command);
      signatureHelp.signatures = [ new vscode.SignatureInformation(entry.label, entry.doc) ];
      for (const elem of entry.label.split("\|").splice(1)) {
          signatureHelp.signatures[0].parameters.push(new vscode.ParameterInformation(elem));
      }
      return Promise.resolve(signatureHelp);
  }
}

// From-state jump
class FstDefinitionProvider {
   provideDefinition(document, position, token) {
       const wordRange = document.getWordRangeAtPosition(position,/\w+/);
       if (!wordRange) return Promise.reject('No state id here.');
       const currentWord = document.lineAt(position.line).text.slice(wordRange.start.character, wordRange.end.character);
       const regEx = new RegExp('^' + currentWord + '(?=[ \\t])', 'gm');
       const text = document.getText();
       let match;
       const list = [];
       while (match = regEx.exec(text)) {
         const uri = vscode.Uri.file(document.fileName);
         const startPos = document.positionAt(match.index);
         const endPos = document.positionAt(match.index + match[0].length);
         const loc = new vscode.Location(uri, new vscode.Range(startPos, endPos));
         list.push(loc);
       }
       if (list.length == 0) {
         return Promise.reject('No definition found');
       }
       return Promise.resolve(list);
   }
}

// To-state jump

class FstReferenceProvider {
   provideReferences(document, position, context, token) {
       const wordRange = document.getWordRangeAtPosition(position,/\w+/);
       if (!wordRange) return Promise.reject('No state id here.');
       const currentWord = document.lineAt(position.line).text.slice(wordRange.start.character, wordRange.end.character);
       const regEx = new RegExp('(?<=^\\w+[ \\t]+)(' + currentWord + ')[: \\t]', 'gm');
       const text = document.getText();
       let match;
       const list = [];
       while (match = regEx.exec(text)) {
         const uri = vscode.Uri.file(document.fileName);
         const startPos = document.positionAt(match.index);
         const endPos = document.positionAt(match.index + match[1].length);
         const loc = new vscode.Location(uri, new vscode.Range(startPos, endPos));
         list.push(loc);
       }
       if (list.length == 0) {
         return Promise.reject('No reference found');
       }
       return Promise.resolve(list);
   }
}

// document checker for initial state and state connectivity 
function checker (document) {
   let diagnostics = [];

   if (document.languageId !== "fst") {
      return;
   }

   const text = document.getText();
   const fromRe = new RegExp('^(\\w+)[ \\t]', 'gm');
   const toRe = new RegExp('^(\\w+[ \\t]+)(\\w+)(?=[ \\t:])', 'gm');
   let fromList = [];
   let toList = [];
   let match;
   let hasInitialState = 0;
   while ((match = toRe.exec(text)) !== null) {
      toList.push(match[2]);
   }
   while (match = fromRe.exec(text)) {
     fromList.push(match[1]);
     if (match[1] == "0") {
        hasInitialState = 1;
        continue;
     }
     if (! toList.includes(match[1])) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[1].length);
        const diagnostic = new vscode.Diagnostic(new vscode.Range(startPos, endPos), "Missing reference for state \'" + match[1] + "\', will never be reached", vscode.DiagnosticSeverity.Warning);
        diagnostics.push(diagnostic);
     }
   }
   while ((match = toRe.exec(text)) !== null) {
      if (! fromList.includes(match[2])) {
         const startPos = document.positionAt(match.index + match[1].length);
         const endPos = document.positionAt(match.index + match[1].length + match[2].length);
         const diagnostic = new vscode.Diagnostic(new vscode.Range(startPos, endPos), "No definition begins with state \'" + match[2] +"\', exec may stop at the state", vscode.DiagnosticSeverity.Warning);
         diagnostics.push(diagnostic);
      }
   }
   if (hasInitialState == 0) {
      const diagnostic = new vscode.Diagnostic(new vscode.Range(0,0,1,0), "Initial state \"0\" not exist", vscode.DiagnosticSeverity.Error);
      diagnostics.push(diagnostic);
   }
   diagnosticCollection.set(document.uri, diagnostics);
}

// holder for delayed updates
let throttle = {
	"document": null,
	"timeout": null
};

// suppress subsequent checker
function suppressCheck (document) {
	if (throttle.timeout && (document === throttle.document)) {
		clearTimeout(throttle.timeout);
		throttle.document = null;
		throttle.timeout = null;
	}
}

// trigger checker at 500ms interval
function requestCheck (document) {
	suppressCheck(document);
	throttle.document = document;
	throttle.timeout = setTimeout(function waitThrottleDuration () {
		// Do not use throttle.document in this function; it may have changed
		checker(document);
		suppressCheck(document);
	}, 500);
}

// request checker on text change
function didChangeTextDocument (event) {
	requestCheck(event.document);
}

// request checker on text open
function didChangeActiveTextEditor (event) {
	checker(event.document);
}

// delete checker on text close
function didCloseTextDocument (document) {
   suppressCheck(document);
	diagnosticCollection.delete(document.uri);
}

class FstRenameProvider {
   provideRenameEdits(document, position, newName, token) {
      const range = document.getWordRangeAtPosition(position,/\w+/);
      if (!range) return undefined;
      const word = document.getText(range);
      const uri = vscode.Uri.file(document.fileName);
      let edit = new vscode.WorkspaceEdit();
      //     edit.replace(document.uri, range, newName);
      const text = document.getText();
      const fromRe = new RegExp('^(\\w+)[ \\t]', 'gm');
      const toRe = new RegExp('^(\\w+[ \\t]+)(\\w+)(?=[ \\t:])', 'gm');
      let match;
      while ((match = fromRe.exec(text)) != null) {
         if (match[1] == word) {
            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[1].length);
            edit.replace(uri, new vscode.Range(startPos, endPos), newName);
         }
      }
      while ((match = toRe.exec(text)) !== null) {
         if (match[2] == word) {
            const startPos = document.positionAt(match.index + match[1].length);
            const endPos = document.positionAt(match.index + match[1].length + match[2].length);
            edit.replace(uri, new vscode.Range(startPos, endPos), newName);
         }
      }
      return Promise.resolve(edit);
   }
}

function activate(context) {
   loadCommandList()
         .then(commandList => {
            context.subscriptions.push(
               vscode.window.onDidChangeActiveTextEditor(didChangeActiveTextEditor),
               vscode.workspace.onDidOpenTextDocument(checker),
               vscode.workspace.onDidChangeTextDocument(didChangeTextDocument),
               vscode.workspace.onDidCloseTextDocument(didCloseTextDocument));
            context.subscriptions.push(vscode.languages.registerCompletionItemProvider(FST_MODE, new FstCompletionItemProvider(), "<"));
            context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(FST_MODE, new FstSignatureHelpProvider(), '|'));
            context.subscriptions.push(vscode.languages.registerDefinitionProvider(FST_MODE, new FstDefinitionProvider()));
            context.subscriptions.push(vscode.languages.registerReferenceProvider(FST_MODE, new FstReferenceProvider()));
            diagnosticCollection = vscode.languages.createDiagnosticCollection("dialogue-fst-editing-support");
            context.subscriptions.push(diagnosticCollection);
            context.subscriptions.push(vscode.languages.registerRenameProvider(FST_MODE, new FstRenameProvider()));
         })
         .catch(error => {
            console.error('Failed to load command list:', error);
         });
}

function deactivate() {
   return undefined;
}

module.exports = { activate, deactivate };
