# DLEditor
```js
var editor = new DLEditor(/* HTMLElement */);
// DLEditor { }
```

# Editor

## Set the editor value
```js
editor.setValue(/* String */);
```

## Get the editor value
```js
editor.getValue();
// String
```

## Insert a text on the current cursor position
```js
editor.insert(/* String */);
// String
```

## Get current cursor row position
```js
editor.getSelectionRow();
// Number
```

## Get current cursor column position
```js
editor.getSelectionColumn();
// Number
```

## Show the line highlight
```js
editor.showLineHighlight();
```

## Hide the line highlight
```js
editor.hideLineHighlight();
```

## Hide the tab
```js
editor.hideTab();
```

## Destroy the instance
```js
editor.destroy();
```

## Set read only
```js
editor.setReadOnly(/* Boolean */);
```

## Get is editor read only
```js
editor.isReadOnly();
// Boolean
```

## [Listen to an event](Events.md)
```js
editor.addEventListener(/* Number : event type, Function */);
```

## [Save an instance](Instance.md)
```js
editor.saveInstance(/* String : name of instance */);
```

## [Restore an instance](Instance.md)
```js
editor.restoreInstance(/* String : name of instance */);
```

# [Modules](Modules.md)
## Apply theme to the editor
```js
editor.applyTheme(/* String : Name of the module */);
// undefined
```

## Apply snippets to the editor
```js
editor.applySnippet(/* String : Name of the module */);
// undefined
```

## Apply syntax highlighter to the editor
```js
editor.applySyntaxHighlighter(/* String : Name of the module */);
// undefined
```

## Apply keybindings to the editor
```js
editor.applyKeybinding(/* String : Name of the module */);
// undefined
```

## Get the current theme of the editor
```js
editor.getTheme();
// String | null
```

## Get the current keybindings of the editor
```js
editor.getKeybinding();
// String | null
```

## Get the current syntax highlighter of the editor
```js
editor.getSyntaxHighlighter();
// String | null
```

## Get the current snippets of the editor
```js
editor.getSnippet();
// String | null
```
