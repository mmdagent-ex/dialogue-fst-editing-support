const vscode = require('vscode');

const FST_MODE = { scheme: 'file', language: 'fst' };

class FstCompletionItemProvider {
   provideCompletionItems(document, position, token) {
         const completionItemsEvent = [
            {label: 'MODEL_EVENT_ADD', kind: vscode.CompletionItemKind.Event},
            {label: 'MODEL_EVENT_CHANGE', kind: vscode.CompletionItemKind.Event},
            {label: 'MODEL_EVENT_DELETE', kind: vscode.CompletionItemKind.Event},
            {label: 'MODEL_EVENT_SELECT', kind: vscode.CompletionItemKind.Event},
            {label: 'MOTION_EVENT_ADD', kind: vscode.CompletionItemKind.Event},
            {label: 'MOTION_EVENT_ACCELERATE', kind: vscode.CompletionItemKind.Event},
            {label: 'MOTION_EVENT_CHANGE', kind: vscode.CompletionItemKind.Event},
            {label: 'MOTION_EVENT_DELETE', kind: vscode.CompletionItemKind.Event},
            {label: 'MOVE_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'MOVE_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'TURN_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'TURN_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'ROTATE_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'ROTATE_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'SCREEN_EVENT_LONGPRESSED', kind: vscode.CompletionItemKind.Event},
            {label: 'SCREEN_EVENT_LONGRELEASED', kind: vscode.CompletionItemKind.Event},
            {label: 'MENU_EVENT|ADD', kind: vscode.CompletionItemKind.Event},
            {label: 'MENU_EVENT|DELETE', kind: vscode.CompletionItemKind.Event},
            {label: 'MENU_EVENT|SETITEM', kind: vscode.CompletionItemKind.Event},
            {label: 'MENU_EVENT|DELETEITEM', kind: vscode.CompletionItemKind.Event},
            {label: 'PROMPT_EVENT_SELECTED', kind: vscode.CompletionItemKind.Event},
            {label: 'INFOTEXT_EVENT_SHOW', kind: vscode.CompletionItemKind.Event},
            {label: 'INFOTEXT_EVENT_CLOSE', kind: vscode.CompletionItemKind.Event},
            {label: 'LOG_START', kind: vscode.CompletionItemKind.Event},
            {label: 'LOG_FINISH', kind: vscode.CompletionItemKind.Event},
            {label: 'LOG_UPLOAD', kind: vscode.CompletionItemKind.Event},
            {label: 'PLUGIN_EVENT_ENABLE', kind: vscode.CompletionItemKind.Event},
            {label: 'PLUGIN_EVENT_DISABLE', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_OVERFLOW', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_GMM', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_AWAY', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_MODIFY|GAIN', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_MODIFY|USERDICT_SET', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_MODIFY|USERDICT_UNSET', kind: vscode.CompletionItemKind.Event},
            {label: 'SYNTH_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'SYNTH_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'LIPSYNC_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'LIPSYNC_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'SOUND_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'SOUND_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'VALUE_EVENT_SET', kind: vscode.CompletionItemKind.Event},
            {label: 'VALUE_EVENT_UNSET', kind: vscode.CompletionItemKind.Event},
            {label: 'VALUE_EVENT_EVAL', kind: vscode.CompletionItemKind.Event},
            {label: 'TIMER_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'TIMER_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'TIMER_EVENT_CANCELLED', kind: vscode.CompletionItemKind.Event},
            {label: 'TEXTAREA_EVENT_ADD', kind: vscode.CompletionItemKind.Event},
            {label: 'TEXTAREA_EVENT_SET', kind: vscode.CompletionItemKind.Event},
            {label: 'TEXTAREA_EVENT_DELETE', kind: vscode.CompletionItemKind.Event},
            {label: 'NETWORK_EVENT_GET', kind: vscode.CompletionItemKind.Event},
            {label: 'BUTTON_EVENT_ADD', kind: vscode.CompletionItemKind.Event},
            {label: 'BUTTON_EVENT_EXEC', kind: vscode.CompletionItemKind.Event},
            {label: 'BUTTON_EVENT_DELETE', kind: vscode.CompletionItemKind.Event},
            {label: 'CURRENT_TIME', kind: vscode.CompletionItemKind.Event},
            {label: 'TAPPED', kind: vscode.CompletionItemKind.Event}
         ];
         const completionItemsCommand = [
           {label: 'MODEL_ADD', kind: vscode.CompletionItemKind.Method},
           {label: 'MODEL_CHANGE', kind: vscode.CompletionItemKind.Method},
           {label: 'MODEL_DELETE', kind: vscode.CompletionItemKind.Method},
           {label: 'MODEL_BINDBONE', kind: vscode.CompletionItemKind.Method},
           {label: 'MODEL_BINDFACE', kind: vscode.CompletionItemKind.Method},
           {label: 'MODEL_ADD', kind: vscode.CompletionItemKind.Method},
           {label: 'MODEL_BINDBONE', kind: vscode.CompletionItemKind.Method},
           {label: 'MOTION_ADD', kind: vscode.CompletionItemKind.Method},
           {label: 'MOTION_CHANGE', kind: vscode.CompletionItemKind.Method},
           {label: 'MOTION_DELETE', kind: vscode.CompletionItemKind.Method},
           {label: 'MOTION_CONFIGURE', kind: vscode.CompletionItemKind.Method},
           {label: 'MOTION_ACCELERATE', kind: vscode.CompletionItemKind.Method},
           {label: 'MOVE_START', kind: vscode.CompletionItemKind.Method},
           {label: 'MOVE_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'TURN_START', kind: vscode.CompletionItemKind.Method},
           {label: 'TURN_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'ROTATE_START', kind: vscode.CompletionItemKind.Method},
           {label: 'ROTATE_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'STAGE', kind: vscode.CompletionItemKind.Method},
           {label: 'LIGHTCOLOR', kind: vscode.CompletionItemKind.Method},
           {label: 'LIGHTDIRECTION', kind: vscode.CompletionItemKind.Method},
           {label: 'DRAGANDDROP', kind: vscode.CompletionItemKind.Method},
           {label: 'KEY', kind: vscode.CompletionItemKind.Method},
           {label: 'MENU|ADD', kind: vscode.CompletionItemKind.Method},
           {label: 'MENU|DELETE', kind: vscode.CompletionItemKind.Method},
           {label: 'MENU|SETITEM', kind: vscode.CompletionItemKind.Method},
           {label: 'MENU|DELETEITEM', kind: vscode.CompletionItemKind.Method},
           {label: 'PROMPT_SHOW', kind: vscode.CompletionItemKind.Method},
           {label: 'KEYVALUE_SET', kind: vscode.CompletionItemKind.Method},
           {label: 'INFOTEXT_FILE', kind: vscode.CompletionItemKind.Method},
           {label: 'INFOTEXT_STRING', kind: vscode.CompletionItemKind.Method},
           {label: 'PLUGIN_ENABLE', kind: vscode.CompletionItemKind.Method},
           {label: 'PLUGIN_DISABLE', kind: vscode.CompletionItemKind.Method},
           {label: 'RECOG_MODIFY|GAIN', kind: vscode.CompletionItemKind.Method},
           {label: 'RECOG_MODIFY|CHANGE_CONF', kind: vscode.CompletionItemKind.Method},
           {label: 'RECOG_MODIFY|USERDICT_SET', kind: vscode.CompletionItemKind.Method},
           {label: 'RECOG_MODIFY|USERDICT_UNSET', kind: vscode.CompletionItemKind.Method},
           {label: 'SYNTH_START', kind: vscode.CompletionItemKind.Method},
           {label: 'SYNTH_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'LIPSYNC_START', kind: vscode.CompletionItemKind.Method},
           {label: 'LIPSYNC_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'SOUND_START', kind: vscode.CompletionItemKind.Method},
           {label: 'SOUND_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'VALUE_SET', kind: vscode.CompletionItemKind.Method},
           {label: 'VALUE_UNSET', kind: vscode.CompletionItemKind.Method},
           {label: 'VALUE_EVAL', kind: vscode.CompletionItemKind.Method},
           {label: 'TIMER_START', kind: vscode.CompletionItemKind.Method},
           {label: 'TIMER_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'FST_LOAD', kind: vscode.CompletionItemKind.Method},
           {label: 'EXECUTE', kind: vscode.CompletionItemKind.Method},
           {label: 'KEY_POST', kind: vscode.CompletionItemKind.Method},
           {label: 'TEXTAREA_ADD', kind: vscode.CompletionItemKind.Method},
           {label: 'TEXTAREA_SET', kind: vscode.CompletionItemKind.Method},
           {label: 'TEXTAREA_DELETE', kind: vscode.CompletionItemKind.Method},
           {label: 'NETWORK_GET', kind: vscode.CompletionItemKind.Method},
           {label: 'BUTTON_ADD', kind: vscode.CompletionItemKind.Method},
           {label: 'BUTTON_DELETE', kind: vscode.CompletionItemKind.Method}
       ];
       const completionItemsEps = [
           {label: 'eps>', kind: vscode.CompletionItemKind.Interface}
       ];
       const linePrefix2 = document.lineAt(position).text.substr(0, position.character);
       if (linePrefix2.endsWith("<")) {
         let completionList = new vscode.CompletionList(completionItemsEps, false);
         return Promise.resolve(completionList);
       }
       const linePrefix = document.lineAt(position).text.substr(0, position.character - 1);
       if (linePrefix.match(/^[\s\d]*$/g)) {
         let completionList = new vscode.CompletionList(completionItemsEvent, false);
         return Promise.resolve(completionList);
       } else if (linePrefix.match(/^[\s\d]*([^\s]+|@.*?@)\s*?$/)) {
          let completionList = new vscode.CompletionList(completionItemsCommand, false);
          return Promise.resolve(completionList);
       }
       return Promise.reject();
   }
}

class FstDefinitionProvider {
   provideDefinition(document, position, token) {
       const wordRange = document.getWordRangeAtPosition(position,/\d+/);
       if (!wordRange) return Promise.reject('No state id here.');
       const currentWord = document.lineAt(position.line).text.slice(wordRange.start.character, wordRange.end.character);
       const regEx = new RegExp('^' + currentWord + '(?=[ \t])', 'gm');
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

class FstReferenceProvider {
   provideReferences(document, position, context, token) {
       const wordRange = document.getWordRangeAtPosition(position,/\d+/);
       if (!wordRange) return Promise.reject('No state id here.');
       const currentWord = document.lineAt(position.line).text.slice(wordRange.start.character, wordRange.end.character);
       const regEx = new RegExp('(?<=^[0-9]+[ \t]+)(' + currentWord + ')[: \t]', 'gm');
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

function activate(context) {
   context.subscriptions.push(vscode.languages.registerCompletionItemProvider(FST_MODE, new FstCompletionItemProvider(), "<"));
   context.subscriptions.push(vscode.languages.registerDefinitionProvider(FST_MODE, new FstDefinitionProvider()));
   context.subscriptions.push(vscode.languages.registerReferenceProvider(FST_MODE, new FstReferenceProvider()));
}

function deactivate() {
   return undefined;
}

module.exports = { activate, deactivate };
