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

## Entrance
Entrance is a function which is called when a keyboard shortcut is performed.
It must return a boolean if the key press event satisfies the required keys.

```js
// "a" + alt
myModule.setEntrance(function(data) {
 return data.isAlt && data.keyCode == 97;
});
```

## Handler
When the entrance returns `true`, then the handler will be triggered.
```js
myModule.setHandler(function() {
  //...
});
```
