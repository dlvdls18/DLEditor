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
