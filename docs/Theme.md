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
```js
static $THEME_BACKGROUND_COLOR = "bgcolor";
static $THEME_LINES_BACKGROUND_COLOR = "lines-bgcolor";
static $THEME_CARET_COLOR = "caret-color";
static $THEME_FONT_SIZE = "font-size";
static $THEME_SELECTION_COLOR = "selection-color";
static $THEME_DEFAULT_COLOR = "default-textcolor";
static $THEME_LINES_COLOR = "lines-textcolor";
static $THEME_FONT_FAMILY = "font-family";
static $THEME_LINE_HIGHLIGHT_COLOR = "line-highlight-color";
static $THEME_LINE_HIGHLIGHT_PADDING = "font-size-half";
static $THEME_TAB_BACKGROUND_COLOR = "tab-bgcolor";
static $THEME_TAB_COLOR = "tab-color";
static $THEME_TAB_QUERY_BACKGROUND_COLOR = "tabquery-badge-bgcolor";
static $THEME_TAB_QUERY_COLOR = "tabquery-badge-color";
static $THEME_TAB_QUERY_HIGHLIGHT_COLOR = "tabquery-badge-highlight-color";
static $THEME_TAB_QUERY_INFO_COLOR = "tabquery-info-color";
```

## Apply value
```js
myModule.setValue(/* String : key, String : css value */);
```
