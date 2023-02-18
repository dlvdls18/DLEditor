# Theme
Theme is a module to design and style the editor.

## Apply theme
```js
editor.applyTheme(/* String : name */);
```

## Get the current theme
```js
editor.getTheme();
// String : name
```

## Remove the current theme
```js
editor.removeTheme();
```

# Building your own Theme module
```js
DLEditor.ThemeBuilder
```

## Keys
```js
DLEditor.$THEME_...
```

To style a property, you need a key which is a css variable.
There are many keys, you can use the format `DLEditor.$THEME_...`.
For example: `DLEditor.$THEME_BACKGROUND_COLOR`.

Too lazy to explain every keys, figure it out on your own. :wink:

## Apply value
```js
myModule.setValue(/* Number : key, String : css value */);
```
