const vscode = require('vscode');

const FST_MODE = { scheme: 'file', language: 'fst' };

let diagnosticCollection = null;

// Event/Command completion
class FstCompletionItemProvider {
   provideCompletionItems(document, position, token) {
         const completionItemsEvent = [
            {label: 'MODEL_EVENT_ADD', kind: vscode.CompletionItemKind.Event},
            {label: 'MODEL_EVENT_CHANGE', kind: vscode.CompletionItemKind.Event},
            {label: 'MODEL_EVENT_DELETE', kind: vscode.CompletionItemKind.Event},
            {label: 'MODEL_EVENT_SELECT', kind: vscode.CompletionItemKind.Event},
            {label: 'MODEL_EVENT_BINDBONE', kind: vscode.CompletionItemKind.Event},
            {label: 'MODEL_EVENT_BINDFACE', kind: vscode.CompletionItemKind.Event},
            {label: 'MODEL_EVENT_UNBINDBONE', kind: vscode.CompletionItemKind.Event},
            {label: 'MODEL_EVENT_UNBINDFACE', kind: vscode.CompletionItemKind.Event},
            {label: 'MOTION_EVENT_ADD', kind: vscode.CompletionItemKind.Event},
            {label: 'MOTION_EVENT_CHANGE', kind: vscode.CompletionItemKind.Event},
            {label: 'MOTION_EVENT_ACCELERATE', kind: vscode.CompletionItemKind.Event},
            {label: 'MOTION_EVENT_RESET', kind: vscode.CompletionItemKind.Event},
            {label: 'MOTION_EVENT_DELETE', kind: vscode.CompletionItemKind.Event},
            {label: 'MOTION_EVENT_CONFIGURE', kind: vscode.CompletionItemKind.Event},
            {label: 'MOVE_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'MOVE_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'TURN_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'TURN_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'ROTATE_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'ROTATE_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'LIPSYNC_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'LIPSYNC_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'PLUGIN_EVENT_ENABLE', kind: vscode.CompletionItemKind.Event},
            {label: 'PLUGIN_EVENT_DISABLE', kind: vscode.CompletionItemKind.Event},
            {label: 'DRAGANDDROP', kind: vscode.CompletionItemKind.Method},
            {label: 'KEY', kind: vscode.CompletionItemKind.Method},
            {label: 'SCREEN_EVENT_LONGPRESSED', kind: vscode.CompletionItemKind.Event},
            {label: 'SCREEN_EVENT_LONGRELEASED', kind: vscode.CompletionItemKind.Event},
            {label: 'BUTTON_EVENT_ADD', kind: vscode.CompletionItemKind.Event},
            {label: 'BUTTON_EVENT_EXEC', kind: vscode.CompletionItemKind.Event},
            {label: 'BUTTON_EVENT_DELETE', kind: vscode.CompletionItemKind.Event},
            {label: 'MENU_EVENT|ADD', kind: vscode.CompletionItemKind.Event},
            {label: 'MENU_EVENT|DELETE', kind: vscode.CompletionItemKind.Event},
            {label: 'MENU_EVENT|SETITEM', kind: vscode.CompletionItemKind.Event},
            {label: 'MENU_EVENT|DELETEITEM', kind: vscode.CompletionItemKind.Event},
            {label: 'PROMPT_EVENT_SELECTED', kind: vscode.CompletionItemKind.Event},
            {label: 'INFOTEXT_EVENT_SHOW', kind: vscode.CompletionItemKind.Event},
            {label: 'INFOTEXT_EVENT_CLOSE', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_OVERFLOW', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_GMM', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_AWAY', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_MODIFY|GAIN', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_MODIFY|USERDICT_SET', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_MODIFY|USERDICT_UNSET', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_MODIFY|CHANGE_CONF', kind: vscode.CompletionItemKind.Event},
            {label: 'SYNTH_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'SYNTH_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
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
            {label: 'CURRENT_TIME', kind: vscode.CompletionItemKind.Event},
            {label: 'TAPPED', kind: vscode.CompletionItemKind.Event},
            {label: 'KAFKA_EVENT_CONNECTED', kind: vscode.CompletionItemKind.Event},
            {label: 'KAFKA_EVENT_DISCONNECTED', kind: vscode.CompletionItemKind.Event},
            {label: 'REMOTE_EVENT_CONNECTED', kind: vscode.CompletionItemKind.Event},
            {label: 'REMOTE_EVENT_DISCONNECTED', kind: vscode.CompletionItemKind.Event},
            {label: 'AVATAR|START', kind: vscode.CompletionItemKind.Event},
            {label: 'AVATAR|END', kind: vscode.CompletionItemKind.Event},
            {label: 'AVATAR_EVENT_CONTROL|DISABLED', kind: vscode.CompletionItemKind.Event},
            {label: 'AVATAR_EVENT_CONTROL|ENABLED', kind: vscode.CompletionItemKind.Event}
         ];
         const completionItemsCommand = [
           {label: 'MODEL_ADD', kind: vscode.CompletionItemKind.Method, documentation: 'hoge'},
           {label: 'MODEL_CHANGE', kind: vscode.CompletionItemKind.Method},
           {label: 'MODEL_DELETE', kind: vscode.CompletionItemKind.Method},
           {label: 'MODEL_BINDBONE', kind: vscode.CompletionItemKind.Method},
           {label: 'MODEL_BINDFACE', kind: vscode.CompletionItemKind.Method},
           {label: 'MODEL_UNBINDBONE', kind: vscode.CompletionItemKind.Method},
           {label: 'MODEL_UNBINDFACE', kind: vscode.CompletionItemKind.Method},
           {label: 'MOTION_ADD', kind: vscode.CompletionItemKind.Method},
           {label: 'MOTION_CHANGE', kind: vscode.CompletionItemKind.Method},
           {label: 'MOTION_ACCELERATE', kind: vscode.CompletionItemKind.Method},
           {label: 'MOTION_RESET', kind: vscode.CompletionItemKind.Method},
           {label: 'MOTION_DELETE', kind: vscode.CompletionItemKind.Method},
           {label: 'MOTION_CONFIGURE', kind: vscode.CompletionItemKind.Method},
           {label: 'MOVE_START', kind: vscode.CompletionItemKind.Method},
           {label: 'MOVE_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'TURN_START', kind: vscode.CompletionItemKind.Method},
           {label: 'TURN_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'ROTATE_START', kind: vscode.CompletionItemKind.Method},
           {label: 'ROTATE_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'STAGE', kind: vscode.CompletionItemKind.Method},
           {label: 'LIGHTCOLOR', kind: vscode.CompletionItemKind.Method},
           {label: 'LIGHTDIRECTION', kind: vscode.CompletionItemKind.Method},
           {label: 'LIPSYNC_START', kind: vscode.CompletionItemKind.Method},
           {label: 'LIPSYNC_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'CAMERA', kind: vscode.CompletionItemKind.Method},
           {label: 'PLUGIN_ENABLE', kind: vscode.CompletionItemKind.Method},
           {label: 'PLUGIN_DISABLE', kind: vscode.CompletionItemKind.Method},
           {label: 'KEYVALUE_SET', kind: vscode.CompletionItemKind.Method},
           {label: 'LOG_START', kind: vscode.CompletionItemKind.Event},
           {label: 'LOG_FINISH', kind: vscode.CompletionItemKind.Event},
           {label: 'LOG_UPLOAD', kind: vscode.CompletionItemKind.Event},
           {label: 'RECOG_RECORD_START', kind: vscode.CompletionItemKind.Method},
           {label: 'RECOG_RECORD_STOP', kind: vscode.CompletionItemKind.Method},
           {label: 'BUTTON_ADD', kind: vscode.CompletionItemKind.Method},
           {label: 'BUTTON_DELETE', kind: vscode.CompletionItemKind.Method},
           {label: 'MENU|ADD', kind: vscode.CompletionItemKind.Method},
           {label: 'MENU|DELETE', kind: vscode.CompletionItemKind.Method},
           {label: 'MENU|SETITEM', kind: vscode.CompletionItemKind.Method},
           {label: 'MENU|DELETEITEM', kind: vscode.CompletionItemKind.Method},
           {label: 'PROMPT_SHOW', kind: vscode.CompletionItemKind.Method},
           {label: 'INFOTEXT_FILE', kind: vscode.CompletionItemKind.Method},
           {label: 'INFOTEXT_STRING', kind: vscode.CompletionItemKind.Method},
           {label: 'RECOG_MODIFY|GAIN', kind: vscode.CompletionItemKind.Method},
           {label: 'RECOG_MODIFY|CHANGE_CONF', kind: vscode.CompletionItemKind.Method},
           {label: 'RECOG_MODIFY|USERDICT_SET', kind: vscode.CompletionItemKind.Method},
           {label: 'RECOG_MODIFY|USERDICT_UNSET', kind: vscode.CompletionItemKind.Method},
           {label: 'SYNTH_START', kind: vscode.CompletionItemKind.Method},
           {label: 'SYNTH_STOP', kind: vscode.CompletionItemKind.Method},
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
           {label: 'AVATAR_CONTROL|ENABLE', kind: vscode.CompletionItemKind.Method},
           {label: 'AVATAR_CONTROL|DISABLE', kind: vscode.CompletionItemKind.Method}
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
       if (linePrefix.match(/^[\s\d]*([^\s]+|@.*?@)\s+$/)) {
          let completionList = new vscode.CompletionList(completionItemsCommand, false);
          return Promise.resolve(completionList);
       } else if (linePrefix.match(/^[\s\d]*[^\|]+$/g)) {
          let completionList = new vscode.CompletionList(completionItemsEvent, false);
          return Promise.resolve(completionList);
       }
       return Promise.reject();
   }
}

// Signature help for each command/event
class FstSignatureHelpProvider {
   provideSignatureHelp(document, position, token) {
      const commandList = [
         {
            name  : "MODEL_EVENT_ADD",
            label : "MODEL_EVENT_ADD|model",
            doc   : "Event issued when a 3D model was added." 
         },
         {
            name  : "MODEL_EVENT_CHANGE",
            label : "MODEL_EVENT_CHANGE|model",
            doc   : "Event issued when a 3D model was changed." 
         },
         {
            name  : "MODEL_EVENT_DELETE",
            label : "MODEL_EVENT_DELETE|model",
            doc   : "Event issued when a 3D model was deleted from scene." 
         },
         {
            name  : "MODEL_EVENT_SELECT",
            label : "MODEL_EVENT_SELECT|model",
            doc   : "Event issued when a 3D model is selected by double-tap."
         },
         {
            name  : "MODEL_EVENT_BINDBONE",
            label : "MODEL_EVENT_BINDBONE|model|boneName",
            doc   : "Event issued when MODEL_BINDBONE was successfully finished."
         },
         {
            name  : "MODEL_EVENT_BINDFACE",
            label : "MODEL_EVENT_BINDFACE|model|faceName",
            doc   : "Event issued when MODEL_BINDFACE was successfully finished."
         },
         {
            name  : "MODEL_EVENT_UNBINDBONE",
            label : "MODEL_EVENT_UNBINDBONE|model|boneName",
            doc   : "Event issued when MODEL_UNBINDBONE was successfully finished."
         },
         {
            name  : "MODEL_EVENT_UNBINDFACE",
            label : "MODEL_EVENT_UNBINDFACE|model|faceName",
            doc   : "Event issued when MODEL_UNBINDFACE was successfully finished."
         },
         {
            name  : "MOTION_EVENT_ADD",
            label : "MOTION_EVENT_ADD|model|motion",
            doc   : "Event issued when a motion was newly added and started on the model."
         },
         {
            name  : "MOTION_EVENT_CHANGE",
            label : "MOTION_EVENT_CHANGE|model|motion",
            doc   : "Event issued when a playing motion was changed."
         },
         {
            name  : "MOTION_EVENT_ACCELERATE",
            label : "MOTION_EVENT_ACCELERATE|model|motion",
            doc   : "Event issued when a motion's accelleration was assigned by MOTION_ACCELERATE."
         },
         {
            name  : "MOTION_EVENT_RESET",
            label : "MOTION_EVENT_RESET|model|motion",
            doc   : "Event issued when a motion was resetted and restarted."
         },
         {
            name  : "MOTION_EVENT_DELETE",
            label : "MOTION_EVENT_DELETE|model|motion",
            doc   : "Event issued when a motion was deleted by finished playing or deletion command."
         },
         {
            name  : "MOTION_EVENT_CONFIGURE",
            label : "MOTION_EVENT_CONFIGURE|model|motion",
            doc  :  "Event issued when a motion's blending mode was changed by MOTION_CONFIGURE."
         },
         {
            name  : "MOVE_EVENT_START",
            label : "MOVE_EVENT_START|model",
            doc  :  "Event issued when a 3D model starts moving by MOVE_START."
         },
         {
            name  : "MOVE_EVENT_STOP",
            label : "MOVE_EVENT_STOP|model",
            doc  :  "Event issued when a 3D model finished movement triggered by MOVE_START."
         },
         {
            name  : "TURN_EVENT_START",
            label : "TURN_EVENT_START|model",
            doc   : "Event issued when a 3D model starts turning by TURN_START."
         },
         {
            name  : "TURN_EVENT_STOP",
            label : "TURN_EVENT_STOP|model",
            doc   : "Event issued when a 3D model finished turning triggered by TURN_START."
         },
         {
            name  : "ROTATE_EVENT_START",
            label : "ROTATE_EVENT_START|model",
            doc   : "Event issued when a 3D model starts rotating by ROTATE_START."
         },
         {
            name  : "ROTATE_EVENT_STOP",
            label : "ROTATE_EVENT_STOP|model",
            doc  :  "Event issued when a 3D model finished rotation issued by ROTATE_START."
         },
         {
            name  : "LIPSYNC_EVENT_START",
            label : "LIPSYNC_EVENT_START|model",
            doc   : "Event issued when a 3D model started lip syncing by LIPSYNC_START."
         },
         {
            name  : "LIPSYNC_EVENT_STOP",
            label : "LIPSYNC_EVENT_STOP|model",
            doc  :  "Event issued when finished playing a lip syncing started by LIPSYNC_START."
         },
         {
            name  : "PLUGIN_EVENT_ENABLE",
            label : "PLUGIN_EVENT_ENABLE|pluginName",
            doc   : "Event issued when a plug-in started working."
         },
         {
            name  : "PLUGIN_EVENT_DISABLE",
            label : "PLUGIN_EVENT_DISABLE|pluginName",
            doc   : "Event issued when a plug-in stopped working."
         },
         {
            name  : "DRAGANDDROP",
            label : "DRAGANDDROP|file",
            doc   : "Event issued when a file was dropped to the window by user."
         },
         {
            name  : "KEY",
            label : "KEY|character",
            doc  :  "Event issued when a key was pressed by user."
         },
         {
            name  : "SCREEN_EVENT_LONGPRESSED",
            label : "SCREEN_EVENT_LONGPRESSED|xxxx_yyyy_wwww_hhhh",
            doc   : "Event issued when a user long-tapped at a position (x, y) of the screen (w, h)."
         },
         {
            name  : "SCREEN_EVENT_LONGRELEASED",
            label : "SCREEN_EVENT_LONGRELEASED|xxxx_yyyy_wwww_hhhh",
            doc   : "Event issued when a user's long-tap was released at a position (x, y) of the screen (w, h)."
         },
         {
            name  : "BUTTON_EVENT_ADD",
            label : "BUTTON_EVENT_ADD|button",
            doc   : "Event issued when the button being added by BUTTON_ADD becomes shown and active on screen."
         },
         {
            name  : "BUTTON_EVENT_EXEC",
            label : "BUTTON_EVENT_EXEC|button",
            doc   : "Event issued when user tapped the button."
         },
         {
            name  : "BUTTON_EVENT_DELETE",
            label : "BUTTON_EVENT_DELETE|button",
            doc  :  "Event issued when the button was deleted by tap action or BUTTON_DELETE."
         },
         {
            name  : "MENU_EVENT",
            label : "MENU_EVENT|ADD or DELETE or SETITEM or DELETEITEM|aliasName|(id)",
            doc  : "Event issued when a menu was changed by MENU command."
         },
         {
            name  : "PROMPT_EVENT_SELECTED",
            label : "PROMPT_EVENT_SELECTED|number",
            doc   : "number > 0 means user has tapped one of the selection of a prompt shown by PROMPT_SHOW. -1 means cancelltation."
         },
         {
            name  : "INFOTEXT_EVENT_SHOW",
            label : "",
            doc   : "Event issued when a full-screen document is being shown by INFOTEXT_FILE or INFOTEXT_STRING."
         },
         {
            name  : "INFOTEXT_EVENT_CLOSE",
            label : "INFOTEXT_EVENT_CLOSE|selectedButtonLabel",
            doc   : "Event issued when a full-screen document was closed by user tapping one of the button.  The selectedButtonLabel is the label of the button user has tapped."
         },
         {
            name  : "RECOG_EVENT_START",
            label : "RECOG_EVENT_START",
            doc   : "Event issued when audio input was detected and speech recognition has been started. (Plugin_Julius)"
         },
         {
            name  : "RECOG_EVENT_STOP",
            label : "RECOG_EVENT_STOP|w1,w2,...",
            doc   : "Gives recognition result after end of speech was detected. (Plugin_Julius or equivalent)"
         },
         {
            name  : "RECOG_EVENT_OVERFLOW",
            label : "RECOG_EVENT_OVERFLOW",
            doc   : "Event issued when audio input is too loud to recognize. (Plugin_Julius or equivalent)"
         },
         {
            name  : "RECOG_EVENT_GMM",
            label : "RECOG_EVENT_GMM|gmm_name",
            doc   : "When GMM audio identification is enabled, gives identification result with the name of the GMM model.  Will be issued just before RECOG_EVENT_STOP. (Plugin_Julius or equivalent)"
         },
         {
            name  : "RECOG_EVENT_AWAY",
            label : "RECOG_EVENT_AWAY|ON or OFF",
            doc   : "Event issued when AWAY status was changed to the value. (Plugin_Julius or equivalent)"
         },
         {
            name  : "RECOG_EVENT_MODIFY",
            label : "RECOG_EVENT_MODIFY|GAIN or USERDICT_SET or USERDICT_UNSET or CHANGE_CONF|(confName)",
            doc   : "Event issued when configuration was changed by RECOG_MODIFY.  \"confName\" is valid for CHANGE_CONF only.  (Plugin_Julius or equivalent)"
         },
         {
            name  : "SYNTH_EVENT_START",
            label : "SYNTH_EVENT_START|model",
            doc   : "Event issued when a model starts talking by speech synthesis. (Plugin_Open_JTalk or equivalent)"
         },
         {
            name  : "SYNTH_EVENT_STOP",
            label : "SYNTH_EVENT_STOP",
            doc   : "Event issued when a model finished talking by speech synthesis. (Plugin_Open_JTalk or equivalent)"
         },
         {
            name  : "SOUND_EVENT_START",
            label : "SOUND_EVENT_START|sound",
            doc   : "Event issued when a sound starts playing by SOUND_START (Plugin_Audio)."
         },
         {
            name  : "SOUND_EVENT_STOP",
            label : "SOUND_EVENT_STOP|sound",
            doc   : "Event issued when a sound being played by SOUND_START finished playing. (Plugin_Audio)"
         },
         {
            name  : "VALUE_EVENT_SET",
            label : "VALUE_EVENT_SET|variable",
            doc   : "Event issued when a value was set to the variable name by VALUE_SET. (Plugin_Variables)"
         },
         {
            name  : "VALUE_EVENT_UNSET",
            label : "VALUE_EVENT_UNSET|variable",
            doc   : "Event issued when the variable was unset by VALUE_UNSET. (Plugin_Variables)"
         },
         {
            name  : "VALUE_EVENT_EVAL",
            label : "VALUE_EVENT_EVAL|variable|EQ or NE or LE or LT or GE or GT|value|TRUE or FALSE",
            doc   : "Tells result of VALUE_EVAL.  The arguments will \"value\" is the evaluated equation itself, and the final argument shows the result. (Plugin_Variables)"
         },
         {
            name  : "TIMER_EVENT_START",
            label : "TIMER_EVENT_START|variable",
            doc   : "Event issued when a value is set to the timer variable and starts. (Plugin_Variables)"
         },
         {
            name  : "TIMER_EVENT_STOP",
            label : "TIMER_EVENT_STOP|variable",
            doc   : "Event issued when a timer variable's count down value has reached 0. (Plugin_Variables)"
         },
         {
            name  : "TIMER_EVENT_CANCELLED",
            label : "TIMER_EVENT_CANCELLED|variable",
            doc  : "Event issued when a count down has been cancelled before reaching 0 due to unset or setting another value. (Plugin_Variables)"
         },
         {
            name  : "TEXTAREA_EVENT_ADD",
            label : "TEXTAREA_EVENT_ADD|textareaName",
            doc  : "Event issued when a TEXTAREA has been added by TEXTAREA_ADD. (Plugin_TextArea)"
         },
         {
            name  : "TEXTAREA_EVENT_SET",
            label : "TEXTAREA_EVENT_SET|textareaName",
            doc   : "Event issued when a TEXTAREA was assigned a text by TEXTAREA_SET. (Plugin_TextArea)"
         },
         {
            name  : "TEXTAREA_EVENT_DELETE",
            label : "TEXTAREA_EVENT_DELETE|textareaName",
            doc  : "Event issued when a TEXTAREA was deleted. (Plugin_TextArea)"
         },
         {
            name  : "NETWORK_EVENT_GET",
            label : "NETWORK_EVENT_GET|networkGetName",
            doc   : "Event issued when fetching a URL to file issued by NETWORK_GET has finished. (Plugin_Network)"
         },
         {
            name  : "CURRENT_TIME",
            label : "CURRENT_TIME|hour|min",
            doc   : "Event issued periodically telling the current local time."
         },
         {
            name  : "TAPPED",
            label : "TAPPED|x|y",
            doc   : "Event issued when a user tapped a screen at the position."
         },
         {
            name  : "KAFKA_EVENT_CONNECTED",
            label : "",
            doc  : "Event issued when ."
         },
         {
            name  : "KAFKA_EVENT_DISCONNECTED",
            label : "",
            doc  : "Event issued when ."
         },
         {
            name  : "REMOTE_EVENT_CONNECTED",
            label : "",
            doc  : "Event issued when ."
         },
         {
            name  : "REMOTE_EVENT_DISCONNECTED",
            label : "",
            doc  : "Event issued when ."
         },
         {
            name  : "AVATAR",
            label : "",
            doc  : "Event issued when ."
         },
         {
            name  : "AVATAR_EVENT_CONTROL",
            label : "",
            doc  : "Event issued when ."
         },
         {
            name  : "",
            label : "",
            doc  : "Event issued when ."
         },
         {
            name  : "MODEL_ADD",
            label : "MODEL_ADD|alias|file|(x,y,z)|(rx,ry,rz)|(cartoon ON/OFF)|(parent model alias)|(parent bone name)",
            doc   : "Add a 3D model into the scene." 
         },
         {
            name  : "MODEL_CHANGE",
            label : "MODEL_CHANGE|alias|file",
            doc   : "Change 3D model of the alias, keeping status." 
         },
         {
            name  : "MODEL_DELETE",
            label : "MODEL_DELETE|alias",
            doc   : "Delete a 3D model from the scene." 
         }

      ];
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

// To-state jump

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

// document checker for initial state and state connectivity 
function checker (document) {
   let diagnostics = [];

   if (document.languageId !== "fst") {
      return;
   }

   const text = document.getText();
   const fromRe = new RegExp('^(\\w+)[ \t]', 'gm');
   const toRe = new RegExp('^\\w+[ \t](\\w+)(?=[ \t:])', 'gm');
   let tList = [];
   let match;
   let hasInitialState = 0;
   while ((match = toRe.exec(text)) !== null) {
      tList.push(match[1]);
   }
   while (match = fromRe.exec(text)) {
     if (match[1] == "0") {
        hasInitialState = 1;
        continue;
     }
     if (! tList.includes(match[1])) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[1].length);
        const diagnostic = new vscode.Diagnostic(new vscode.Range(startPos, endPos), "Transition to state \"" + match[1] +"\" not found", vscode.DiagnosticSeverity.Warning);
        diagnostics.push(diagnostic);
     }
   }
   if (hasInitialState == 0) {
      const diagnostic = new vscode.Diagnostic(new vscode.Range(0,0,1,0), "Initial state \"0\" not found", vscode.DiagnosticSeverity.Error);
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

// delete checker on text close
function didCloseTextDocument (document) {
   suppressCheck(document);
	diagnosticCollection.delete(document.uri);
}

function activate(context) {
   context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument(checker),
      vscode.workspace.onDidChangeTextDocument(didChangeTextDocument),
		vscode.workspace.onDidCloseTextDocument(didCloseTextDocument));
   context.subscriptions.push(vscode.languages.registerCompletionItemProvider(FST_MODE, new FstCompletionItemProvider(), "<"));
   context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(FST_MODE, new FstSignatureHelpProvider(), '|'));
   context.subscriptions.push(vscode.languages.registerDefinitionProvider(FST_MODE, new FstDefinitionProvider()));
   context.subscriptions.push(vscode.languages.registerReferenceProvider(FST_MODE, new FstReferenceProvider()));
   diagnosticCollection = vscode.languages.createDiagnosticCollection("dialogue-fst-editing-support");
	context.subscriptions.push(diagnosticCollection);
}

function deactivate() {
   return undefined;
}

module.exports = { activate, deactivate };
