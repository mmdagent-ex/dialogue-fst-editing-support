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
            {label: 'MENU_EVENT', kind: vscode.CompletionItemKind.Event},
            {label: 'PROMPT_EVENT_SELECTED', kind: vscode.CompletionItemKind.Event},
            {label: 'INFOTEXT_EVENT_SHOW', kind: vscode.CompletionItemKind.Event},
            {label: 'INFOTEXT_EVENT_CLOSE', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_START', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_STOP', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_OVERFLOW', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_GMM', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_AWAY', kind: vscode.CompletionItemKind.Event},
            {label: 'RECOG_EVENT_MODIFY', kind: vscode.CompletionItemKind.Event},
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
            {label: 'REMOTE_EVENT_CONNECTED', kind: vscode.CompletionItemKind.Event},
            {label: 'REMOTE_EVENT_DISCONNECTED', kind: vscode.CompletionItemKind.Event},
            {label: 'AVATAR', kind: vscode.CompletionItemKind.Event},
            {label: 'AVATAR_EVENT_CONTROL', kind: vscode.CompletionItemKind.Event}
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
           {label: 'MENU', kind: vscode.CompletionItemKind.Method},
           {label: 'PROMPT_SHOW', kind: vscode.CompletionItemKind.Method},
           {label: 'INFOTEXT_FILE', kind: vscode.CompletionItemKind.Method},
           {label: 'INFOTEXT_STRING', kind: vscode.CompletionItemKind.Method},
           {label: 'RECOG_MODIFY', kind: vscode.CompletionItemKind.Method},
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
           {label: 'AVATAR_CONTROL', kind: vscode.CompletionItemKind.Method}
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
      const commandList = [
         {
            name  : "MODEL_EVENT_ADD",
            label : "MODEL_EVENT_ADD|model alias",
            doc   : "Event issued when a 3D model was added." 
         },
         {
            name  : "MODEL_EVENT_CHANGE",
            label : "MODEL_EVENT_CHANGE|model alias",
            doc   : "Event issued when a 3D model was changed." 
         },
         {
            name  : "MODEL_EVENT_DELETE",
            label : "MODEL_EVENT_DELETE|model alias",
            doc   : "Event issued when a 3D model was deleted from scene." 
         },
         {
            name  : "MODEL_EVENT_SELECT",
            label : "MODEL_EVENT_SELECT|model alias",
            doc   : "Event issued when a 3D model is selected by double-tap."
         },
         {
            name  : "MODEL_EVENT_BINDBONE",
            label : "MODEL_EVENT_BINDBONE|model alias|bone name",
            doc   : "Event issued when MODEL_BINDBONE was successfully finished."
         },
         {
            name  : "MODEL_EVENT_BINDFACE",
            label : "MODEL_EVENT_BINDFACE|model alias|face name",
            doc   : "Event issued when MODEL_BINDFACE was successfully finished."
         },
         {
            name  : "MODEL_EVENT_UNBINDBONE",
            label : "MODEL_EVENT_UNBINDBONE|model alias|bone name",
            doc   : "Event issued when MODEL_UNBINDBONE was successfully finished."
         },
         {
            name  : "MODEL_EVENT_UNBINDFACE",
            label : "MODEL_EVENT_UNBINDFACE|model alias|face name",
            doc   : "Event issued when MODEL_UNBINDFACE was successfully finished."
         },
         {
            name  : "MOTION_EVENT_ADD",
            label : "MOTION_EVENT_ADD|model alias|motion alias",
            doc   : "Event issued when a motion was newly added and started on the model."
         },
         {
            name  : "MOTION_EVENT_CHANGE",
            label : "MOTION_EVENT_CHANGE|model alias|motion alias",
            doc   : "Event issued when a playing motion was changed."
         },
         {
            name  : "MOTION_EVENT_ACCELERATE",
            label : "MOTION_EVENT_ACCELERATE|model alias|motion alias",
            doc   : "Event issued when a motion's accelleration was assigned by MOTION_ACCELERATE."
         },
         {
            name  : "MOTION_EVENT_RESET",
            label : "MOTION_EVENT_RESET|model alias|motion alias",
            doc   : "Event issued when a motion was resetted and restarted."
         },
         {
            name  : "MOTION_EVENT_DELETE",
            label : "MOTION_EVENT_DELETE|model alias|motion alias",
            doc   : "Event issued when a motion was deleted by finished playing or deletion command."
         },
         {
            name  : "MOTION_EVENT_CONFIGURE",
            label : "MOTION_EVENT_CONFIGURE|model alias|motion alias",
            doc  :  "Event issued when a motion's blending mode was changed by MOTION_CONFIGURE."
         },
         {
            name  : "MOVE_EVENT_START",
            label : "MOVE_EVENT_START|model alias",
            doc  :  "Event issued when a 3D model starts moving by MOVE_START."
         },
         {
            name  : "MOVE_EVENT_STOP",
            label : "MOVE_EVENT_STOP|model alias",
            doc  :  "Event issued when a 3D model finished movement triggered by MOVE_START (reached end or forced to stop by MOVE_STOP)."
         },
         {
            name  : "TURN_EVENT_START",
            label : "TURN_EVENT_START|model alias",
            doc   : "Event issued when a 3D model starts turning by TURN_START."
         },
         {
            name  : "TURN_EVENT_STOP",
            label : "TURN_EVENT_STOP|model alias",
            doc   : "Event issued when a 3D model finished turning triggered by TURN_START."
         },
         {
            name  : "ROTATE_EVENT_START",
            label : "ROTATE_EVENT_START|model alias",
            doc   : "Event issued when a 3D model starts rotating by ROTATE_START."
         },
         {
            name  : "ROTATE_EVENT_STOP",
            label : "ROTATE_EVENT_STOP|model alias",
            doc  :  "Event issued when a 3D model finished rotation issued by ROTATE_START."
         },
         {
            name  : "LIPSYNC_EVENT_START",
            label : "LIPSYNC_EVENT_START|mode aliasl",
            doc   : "Event issued when a 3D model started lip syncing by LIPSYNC_START."
         },
         {
            name  : "LIPSYNC_EVENT_STOP",
            label : "LIPSYNC_EVENT_STOP|model alias",
            doc  :  "Event issued when finished playing a lip syncing started by LIPSYNC_START."
         },
         {
            name  : "PLUGIN_EVENT_ENABLE",
            label : "PLUGIN_EVENT_ENABLE|plugin name",
            doc   : "Event issued when a plug-in started working."
         },
         {
            name  : "PLUGIN_EVENT_DISABLE",
            label : "PLUGIN_EVENT_DISABLE|plugin name",
            doc   : "Event issued when a plug-in stopped working."
         },
         {
            name  : "DRAGANDDROP",
            label : "DRAGANDDROP|file path",
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
            label : "BUTTON_EVENT_ADD|button alias",
            doc   : "Event issued when the button being added by BUTTON_ADD becomes shown and active on screen."
         },
         {
            name  : "BUTTON_EVENT_EXEC",
            label : "BUTTON_EVENT_EXEC|button alias",
            doc   : "Event issued when user tapped the button."
         },
         {
            name  : "BUTTON_EVENT_DELETE",
            label : "BUTTON_EVENT_DELETE|button alias",
            doc  :  "Event issued when the button was deleted by tap action or BUTTON_DELETE."
         },
         {
            name  : "MENU_EVENT",
            label : "MENU_EVENT|ADD or DELETE or SETITEM or DELETEITEM|menu alias|(id)",
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
            label : "INFOTEXT_EVENT_CLOSE|selected button label string",
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
            label : "RECOG_EVENT_GMM|gmm name",
            doc   : "When GMM audio identification is enabled, gives identification result with the name of the GMM model.  Will be issued just before RECOG_EVENT_STOP. (Plugin_Julius or equivalent)"
         },
         {
            name  : "RECOG_EVENT_AWAY",
            label : "RECOG_EVENT_AWAY|ON or OFF",
            doc   : "Event issued when AWAY status was changed to the value. (Plugin_Julius or equivalent)"
         },
         {
            name  : "RECOG_EVENT_MODIFY",
            label : "RECOG_EVENT_MODIFY|GAIN or USERDICT_SET or USERDICT_UNSET or CHANGE_CONF|(config name)",
            doc   : "Event issued when configuration was changed by RECOG_MODIFY.  \"confName\" is valid for CHANGE_CONF only.  (Plugin_Julius or equivalent)"
         },
         {
            name  : "SYNTH_EVENT_START",
            label : "SYNTH_EVENT_START|model alias",
            doc   : "Event issued when a model starts talking by speech synthesis. (Plugin_Open_JTalk or equivalent)"
         },
         {
            name  : "SYNTH_EVENT_STOP",
            label : "SYNTH_EVENT_STOP|model alias",
            doc   : "Event issued when a model finished talking by speech synthesis. (Plugin_Open_JTalk or equivalent)"
         },
         {
            name  : "SOUND_EVENT_START",
            label : "SOUND_EVENT_START|sound alias",
            doc   : "Event issued when a sound starts playing by SOUND_START (Plugin_Audio)."
         },
         {
            name  : "SOUND_EVENT_STOP",
            label : "SOUND_EVENT_STOP|sound alias",
            doc   : "Event issued when a sound being played by SOUND_START finished playing. (Plugin_Audio)"
         },
         {
            name  : "VALUE_EVENT_SET",
            label : "VALUE_EVENT_SET|variable name",
            doc   : "Event issued when a value was set to the variable name by VALUE_SET. (Plugin_Variables)"
         },
         {
            name  : "VALUE_EVENT_UNSET",
            label : "VALUE_EVENT_UNSET|variable name",
            doc   : "Event issued when the variable was unset by VALUE_UNSET. (Plugin_Variables)"
         },
         {
            name  : "VALUE_EVENT_EVAL",
            label : "VALUE_EVENT_EVAL|variable name|EQ or NE or LE or LT or GE or GT|value|TRUE or FALSE",
            doc   : "Tells result of VALUE_EVAL.  The arguments will \"value\" is the evaluated equation itself, and the final argument shows the result. (Plugin_Variables)"
         },
         {
            name  : "TIMER_EVENT_START",
            label : "TIMER_EVENT_START|variable name",
            doc   : "Event issued when a value is set to the timer variable and starts. (Plugin_Variables)"
         },
         {
            name  : "TIMER_EVENT_STOP",
            label : "TIMER_EVENT_STOP|variable name",
            doc   : "Event issued when a timer variable's count down value has reached 0. (Plugin_Variables)"
         },
         {
            name  : "TIMER_EVENT_CANCELLED",
            label : "TIMER_EVENT_CANCELLED|variable name",
            doc  : "Event issued when a count down has been cancelled before reaching 0 due to unset or setting another value. (Plugin_Variables)"
         },
         {
            name  : "TEXTAREA_EVENT_ADD",
            label : "TEXTAREA_EVENT_ADD|textarea name",
            doc  : "Event issued when a TEXTAREA has been added by TEXTAREA_ADD. (Plugin_TextArea)"
         },
         {
            name  : "TEXTAREA_EVENT_SET",
            label : "TEXTAREA_EVENT_SET|textarea name",
            doc   : "Event issued when a TEXTAREA was assigned a text by TEXTAREA_SET. (Plugin_TextArea)"
         },
         {
            name  : "TEXTAREA_EVENT_DELETE",
            label : "TEXTAREA_EVENT_DELETE|textarea name",
            doc  : "Event issued when a TEXTAREA was deleted. (Plugin_TextArea)"
         },
         {
            name  : "NETWORK_EVENT_GET",
            label : "NETWORK_EVENT_GET|network get alias",
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
            name  : "REMOTE_EVENT_CONNECTED",
            label : "REMOTE_EVENT_CONNECTED|host name",
            doc   : "Event issued when a peer was connected. (Plugin_Remote)"
         },
         {
            name  : "REMOTE_EVENT_DISCONNECTED",
            label : "REMOTE_EVENT_DISCONNECTED|host name",
            doc  : "Event issued when a connecting peer has been disconnected. (Plugin_Remote)"
         },
         {
            name  : "AVATAR",
            label : "AVATAR|START or END",
            doc  : "Event issued when an avatar control start / end singal was received from remote host. (Plugin_Remote)"
         },
         {
            name  : "AVATAR_EVENT_CONTROL",
            label : "AVATAR_EVENT_CONTROL|ENABLED or DISABLED",
            doc  : "Event issued when avatar control was enabled or disabled by AVATAR_CONTROL command. (Plugin_Remote)"
         },
         {
            name  : "MODEL_ADD",
            label : "MODEL_ADD|model alias|file.pmd|(x,y,z)|(rx,ry,rz)|(ON or OFF for cartoon)|(parent model alias)|(parent bone name)",
            doc   : "Add a 3D model into the scene." 
         },
         {
            name  : "MODEL_CHANGE",
            label : "MODEL_CHANGE|model alias|file.pmd",
            doc   : "Change 3D model of the alias, keeping status." 
         },
         {
            name  : "MODEL_DELETE",
            label : "MODEL_DELETE|model alias",
            doc   : "Delete a 3D model from the scene." 
         },
         {
            name  : "MODEL_BINDBONE",
            label : "MODEL_BINDBONE|keyvalue name|min|max|model alias|bone name|x1,y1,z1|rx1,ry1,rz1|x2,y2,z2|rx2,ry2,rz2",
            doc   : "Bind a KeyValue [min..max] to a bone movement rating from pos1/rot1 to pos2/rot2.  Another usage is \"MODEL_BINDBONE|model alias(bone name|x,y,z|rx,ry,rz\" to force fixed pos/rot.  This setting overwrites all motion control.  When multiplied, only the last one will be valid."
         },
         {
            name  : "MODEL_BINDFACE",
            label : "MODEL_BINDFACE|keyvalue name|min|max|model alias|face name|rate1|rate2",
            doc   : "Bind a KeyValue [min..max] to a face rate from rate1 to rate2.  Another usage is \"MODEL_BINDFACE|model alias|bone name|rate\" to force the fixed rate. This setting overwrites all motion control. When multiplied, only the last one will be valid."
         },
         {
            name  : "MODEL_UNBINDBONE",
            label : "MODEL_UNBINDBONE|model alias|bone name|",
            doc   : "Remove bone binding.  If not binded, do nothing." 
         },
         {
            name  : "MODEL_UNBINDFACE",
            label : "MODEL_UNBINDFACE|model alias|face name|",
            doc   : "Remove face binding.  If not binded, do nothing." 
         },
         {
            name  : "MOTION_ADD",
            label : "MOTION_ADD|model alias|motion alias|file.vmd|(FULL or PART)|(ONCE or LOOP)|(ON or OFF for smoothing)|(ON or OFF for reposition)|(priority)",
            doc   : "Add a new motion to the model.  Default priority is 0, motion of higher priority will supersede lower ones (with the same priority, later one will supersede)." 
         },
         {
            name  : "MOTION_CHANGE",
            label : "MOTION_CHANGE|model alias|motion alias|file.vmd",
            doc   : "Swap the content of the playing motion, keeping its status." 
         },
         {
            name  : "MOTION_ACCELERATE",
            label : "MOTION_ACCELERATE|model alias|motion alias|speed|(duration)|(target)",
            doc   : "Change motion speed.  Default speed is 1.0.  \"duration\" is time duration in seconds used for smooth speed change (0 means immediate change). \"target\" is point in the plyaing motion to start speed change in seconds."
         },
         {
            name  : "MOTION_RESET",
            label : "MOTION_RESET|model alias|motion alias",
            doc   : "Rewind the playing motion to the starting frame, keeping its status." 
         },
         {
            name  : "MOTION_DELETE",
            label : "MOTION_DELETE|model alias|motion alias",
            doc   : "Delete the playing motion." 
         },
         {
            name  : "MOTION_CONFIGURE",
            label : "MOTION_CONFIGURE|model alias|motion alias|COMMAND|(rate)",
            doc   : "Configure how the motion should be blended.  \"COMMAND\" should be one of \"MODE_REPLACE\", \"MODE_ADD\" or \"BLEND_RATE\" with additional rate parameter.  You can also set per-bone, per-face setting by replacing \"COMMAND|(rate)\" with \"MODE_{BONE|FACE}_{REPLACE|ADD|NONE}|name[,name,..]\"."
         },
         {
            name  : "MOVE_START",
            label : "MOVE_START|model alias|x,y,z|(GLOBAL or LOCAL)|(speed)",
            doc   : "Start Moving the model position toward the position. Setting the speed in distance per second enables moving with fixed speed." 
         },
         {
            name  : "MOVE_STOP",
            label : "MOVE_STOP|model alias",
            doc   : "Force stop moving the model." 
         },
         {
            name  : "TURN_START",
            label : "TURN_START|model alias|x,y,z|(GLOBAL or LOCAL)|(speed)",
            doc   : "Start rotating the model to face toward the given position. Setting the speed in degree per second enabled rotating with fixed speed." 
         },
         {
            name  : "TURN_STOP",
            label : "TURN_STOP|model alias",
            doc   : "Force stop turning the model." 
         },
         {
            name  : "ROTATE_START",
            label : "ROTATE_START|model alias|rx,ry,rz|(GLOBAL or LOCAL)|(speed)",
            doc   : "" 
         },
         {
            name  : "ROTATE_STOP",
            label : "ROTATE_STOP",
            doc   : "Start rotating the model by the given rotation. Setting the speed in degree per second enabled rotating with fixed speed." 
         },
         {
            name  : "STAGE",
            label : "STAGE|file.pmd or file.xpmd or floorImagefile,backImagefile",
            doc   : "Set stage.  \"file.pmd\" and \"file.xpmd\" loads a 3D model as stage, latter one will render in non-toon mode.  Specifying two imagefile will set them at floor and background."
         },
         {
            name  : "LIGHTCOLOR",
            label : "LIGHTCOLOR|r,g,b",
            doc   : "Set light color." 
         },
         {
            name  : "LIGHTDIRECTION",
            label : "LIGHTDIRECTION|x,y,z",
            doc   : "Set light direction." 
         },
         {
            name  : "LIPSYNC_START",
            label : "LIPSYNC_START|model alias|phoneme string and milliseconds pairs",
            doc   : "Start lip sync on the model" 
         },
         {
            name  : "LIPSYNC_STOP",
            label : "LIPSYNC_STOP",
            doc   : "Force stop the playing lip sync." 
         },
         {
            name  : "CAMERA",
            label : "CAMERA|x,y,z|rx,ry,rz|distance|fovy|(transition period)|(model alias)|(bone name)",
            doc   : "Specify camera parameters.  Give transition period in seconds for fixed speed camera moving to the specified parameter with the duration.  Giving model alias enables model-focus panning, and additional bone name to mount camera on the bone.  Also \"CAMERA|file.vmd\" enables camera motion playing." 
         },
         {
            name  : "PLUGIN_ENABLE",
            label : "PLUGIN_ENABLE|plugin name",
            doc   : "Enable the plug-in." 
         },
         {
            name  : "PLUGIN_DISABLE",
            label : "PLUGIN_DISABLE|plugin name",
            doc   : "Disable the plug-in." 
         },
         {
            name  : "KEYVALUE_SET",
            label : "KEYVALUE_SET|keyvalue name|value",
            doc   : "Set a KeyValue variable." 
         },
         {
            name  : "LOG_START",
            label : "LOG_START",
            doc   : "Start user input logging and storing until LOG_FINISH is issued." 
         },
         {
            name  : "LOG_FINISH",
            label : "LOG_FINISH",
            doc   : "Stop user input logging and storing." 
         },
         {
            name  : "LOG_UPLOAD",
            label : "LOG_UPLOAD",
            doc   : "Upload the logged data into the server specified by the content." 
         },
         {
            name  : "RECOG_RECORD_START",
            label : "RECOG_RECORD_START",
            doc   : "Start user voice recording and storing to local storage until RECOG_RECORD_STOP is issued." 
         },
         {
            name  : "RECOG_RECORD_STOP",
            label : "RECOG_RECORD_STOP",
            doc   : "Stop user voice recording and storing to local storage." 
         },
         {
            name  : "BUTTON_ADD",
            label : "BUTTON_ADD|button alias|scale|x,y|image path|action|(ON or OFF for autoclose)",
            doc   : "Add in-content button to the screen." 
         },
         {
            name  : "BUTTON_DELETE",
            label : "BUTTON_DELETE|button alias",
            doc   : "Delete the button previously added by BUTTON_ADD." 
         },
         {
            name  : "MENU",
            label : "MENU|COMMAND",
            doc   : "Manage in-content menu. COMMAND can be \"ADD|alias|(backgroundImagePath)\", \"DELETE|alias\", \"SETITEM|alias|id|label_string|message_string\", or \"DELETEITEM|alias|id\"." 
         },
         {
            name  : "PROMPT_SHOW",
            label : "PROMPT_SHOW|main text string|selection label 1|selection label 2|...",
            doc   : "Show a prompt dialogue and wait for user response.  After selection PROMPT_EVENT_SELECTED will be issued."
         },
         {
            name  : "INFOTEXT_FILE",
            label : "INFOTEXT_FILE|text file|title label|button label[, label,..]|(scale)|(background color)|(text color)",
            doc   : "Display content of the text file at full screen.  Tapping button will issue INFOTEXT_EVENT_CLOSE with tapped button label.  Colors should be given as RGB \"ff00cc\" or RGBA \"ff00ccbb\".  Text should be in UTF-8." 
         },
         {
            name  : "INFOTEXT_STRING",
            label : "INFOTEXT_STRING|text body|title label|button label[, label,..]|(scale)|(background color)|(text color)",
            doc   : "Display the text body at full screen.  Tapping button will issue INFOTEXT_EVENT_CLOSE with tapped button label.  Colors should be given as RGB \"ff00cc\" or RGBA \"ff00ccbb\".  Text should be in UTF-8." 
         },
         {
            name  : "RECOG_MODIFY",
            label : "RECOG_MODIFY|COMMANDS",
            doc   : "Modify recognition parameter.  COMMANDS are \"GAIN|scaling_value\", \"CHANGE_CONF|jconf_file\", \"USERDICT_SET|dictionary file\" or \"USERDICT_UNSET\"." 
         },
         {
            name  : "SYNTH_START",
            label : "SYNTH_START|model alias|voice alias|text string",
            doc   : "Start voice synthesis of the text with the specified voice.  Lip sync will be played on the model." 
         },
         {
            name  : "SYNTH_STOP",
            label : "SYNTH_STOP|model alias",
            doc   : "Stop voice sysnthesis being played on the model." 
         },
         {
            name  : "SOUND_START",
            label : "SOUND_START|sound alias|sound file",
            doc   : "Start playing the audio file." 
         },
         {
            name  : "SOUND_STOP",
            label : "SOUND_STOP|sound alias",
            doc   : "Stop sound playing." 
         },
         {
            name  : "VALUE_SET",
            label : "VALUE_SET|variable name|value",
            doc   : "Set the variable of the name to the value.  The value can be \"minvalue|maxvalue\", in case a random value within the given numerical range will be assigned."
         },
         {
            name  : "VALUE_UNSET",
            label : "VALUE_UNSET|variable name",
            doc   : "Clear and unset the variable." 
         },
         {
            name  : "VALUE_EVAL",
            label : "VALUE_EVAL|variable name|EQ or NE or LE or LT or GE or GT|value",
            doc   : "Evaluate the variable and issue VALUE_EVENT_EVAL with the evaluation result TRUE or FALSE."
         },
         {
            name  : "TIMER_START",
            label : "TIMER_START|variable name|seconds",
            doc   : "Set the count-down timer variable to the specified seconds.  Overwriting variable that does not reach 0 will issue TIMER_EVENT_CANCELLED first."
         },
         {
            name  : "TIMER_STOP",
            label : "TIMER_STOP|variable name",
            doc   : "Force cancel the count-down timer variable, and set its value to 0." 
         },
         {
            name  : "FST_LOAD",
            label : "FST_LOAD|FST file|(initial state)",
            doc   : "load FST file and start playing it. Current FST will be stopped and swapped to the new FST.  When initial state is not given it is assumed to \"0\"."
         },
         {
            name  : "EXECUTE",
            label : "EXECUTE|file",
            doc   : "Tell OS to execute the file." 
         },
         {
            name  : "KEY_POST",
            label : "KEY_POST|window class name|key name|(ON or OFF for shift-key)|(ON or OFF for ctrl-key)|(On or OFF for alt-key)",
            doc   : "Send key event to other window." 
         },
         {
            name  : "TEXTAREA_ADD",
            label : "TEXTAREA_ADD|textarea alias|width,height|size,margin,exlinespace|r,g,b,a|r,g,b,a|x,y,z|(rx,ry,rz)|(parent model alias)|(parent bone name)",
            doc   : "Add a new textarea." 
         },
         {
            name  : "TEXTAREA_SET",
            label : "TEXTAREA_SET|textarea alias|text string or image file path",
            doc   : "Set content to existing textarea." 
         },
         {
            name  : "TEXTAREA_DELETE",
            label : "TEXTAREA_DELETE|textarea alias",
            doc   : "Delete the textarea." 
         },
         {
            name  : "NETWORK_GET",
            label : "NETWORK_GET|network get alias|URI|save file name",
            doc   : "Open the URI and dump the fetched data into file." 
         },
         {
            name  : "AVATAR_CONTROL",
            label : "AVATAR_CONTROL|DISABLE or ENABLE",
            doc   : "Temporary rurn off/on avatar control from remote host." 
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
   const toRe = new RegExp('^\\w+[ \\t]+(\\w+)(?=[ \\t:])', 'gm');
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
