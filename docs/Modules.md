# Modules
DLEditor Modules are add-ons on your editor.
All modules are in `DLEditor.DLEditorModules`.

# Available module type
- [Syntax Highlighter](SyntaxHighlighter.md)
  - Uses to add colors to editor text.
- [Snippets](Snippets.md)
  - Uses to add snippets to the tab.
- [Keybindings](Keybindings.md)
  - Uses to add actions to keyboard key shortcuts.
- [Theme](Theme.md)
  - Uses to decorate your editor.
    Take note that Theme and Syntax Highlighter is not same thing. Learn more at [Difference between Theme and Syntax Highlighter]()

# Building module tips

## Use `DLEditor.DefinedModules` to define your module

To make the window clean, don't scatter built modules.
Define it in a single object and it is the `DLEditor.DefinedModules`.
This is fully optional but recommended.

```js
// Don't
window.MyDLEditorModuleSyntaxHighlighter = ...

// Do
DLEditor.DefinedModules.MySyntaxHighlighter = ...
```

## `IMPORTANT` Exporting your module
Every constructed modules will not be available when applying it unless you export it.

```js
myModule.exportModule();
```

You can call this when everything is ready.

## Difference between Theme and Syntax Highlighter
Theme is just designing the editor and not the actual editor texts.
While Syntax Highlighter designs editor text.

## Problem with Theme and Syntax Highlighter
When the theme is in light mode, the Syntax Highlighter does not change.
It is recommended to use a module with Theme and Syntax Highlighter so light mode is supported.
Because theme can be light mode while syntax highlighter is not, or the syntax highlighter is light mode but the theme is not making the editor ugly.
