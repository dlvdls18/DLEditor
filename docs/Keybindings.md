# Keybindings
Keybindings is a module to control keyboard shortcuts.
Keybindings only triggers when the specific editor is being used.

## Apply keybinding
```js
editor.applyKeybinding(/* String : name */);
```

## Get the keybinding
```js
editor.getKeybinding();
// String : name
```

## Remove the keybinding
```js
editor.removeKeybinding();
```

# Building your Keybinding module
```js
new DLEditor.KeybindingsBuilder(/* String : name */);
```
