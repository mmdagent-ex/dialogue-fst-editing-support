# dialogue-fst-editing-support README

This package supports .fst file editing for [MMDAgent-EX](https://mmdagent-ex.dev).

## Features

- Colors and Highlights
- Message name auto completion
- Signature help
- “Peek / Jump to Definition” on state id
- “Jump to Reference / Show List” on state id
- Isolated state warning
- Initial state warning

For example if there is an image subfolder under your extension project workspace:

![snapshot](https://raw.githubusercontent.com/lee-lab/dialogue-fst-editing-support/main/images/snap-1.0.0.png)

## Requirements

Tested on 1.52.0

## Extension Settings

No setting will be added by this extension.

## Known Issues

## Release Notes

### 1.0.0

Initial release of this extension.

### 1.1.0

Update version.

- Better highlights
- Completion updated for recent version
- Diagnostics: initial state, isolated state
- Signature helps

### 1.2.0

Update version.

- More commands
- added "%INCLUDE"

### 1.2.2

Updated version.

- More commands
- MMDAgent-EX 1.0.3 compliant

### 1.2.3

Updated version.

- MMDAgent-EX 1.0.4 compliant

### 1.2.5

- Added TRANSPARENT_START and TRANSPARENT_STOP

### 1.3.0

- Added messages
  - WINDOWFRAME_ADD, WINDOWFRAME_EVENT_ADD
  - WINDOWFRAME_DELETE, WINDOWFRAME_EVENT_DELETE
  - WINDOWFRAME_DELETEALL
  - (MS version only)
    - SUBFST_START, SUBFST_START_IF, SUBFST_STOP
    - SUBFST_EVENT_START, SUBFST_EVENT_STOP
    - TIMER_PAUSE, TIMER_RESUME

- Improved highlight algorithm

### 1.3.1

- Added missing messages
  - TIMER_CANCEL
  - TIMER_EVENT_CANCELLED

### 1.3.2

- Added new messages
  - TEXTAREA_HIDE, TEXTAREA_SHOW
  - TEXTAREA_EVENT_HIDE, TEXTAREA_EVENT_SHOW

### 1.3.3

- Added missing messages
  - AVATAR_EVENT_IDLE|START, AVATAR_EVENT_IDLE|STOP
