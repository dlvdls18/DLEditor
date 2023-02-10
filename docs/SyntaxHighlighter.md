# Syntax Highlighter
Syntax Highlighter is a module to color texts.

![Syntax Highlighter](../img/highlight.jpg)

```js
editor.applySyntaxHighlighter("default");
// Note: the syntax highlighter
// module "default" is only defined
// when builder script is included.
```

# Building your syntax highlighter module
```js
// Note: read the article 
var myModule = new DLEditor.SyntaxHighlighterBuilder(/* String : module name */);
```

## Initalize Handler

Initialize handler is called before processing editor's value lines.


### Set the initialize handler
```js
myModule.setInitHandler(function(editorValue) {
  // ...
});
```

### Get the initialize handler
```js
myModule.getInitHandler();
// Function
```

### Remove the initialize handler
```js
myModule.removeInitHandler();
```

## Process Handler

Process handler is called repeatedly (acts as forEach of editor value lines).
The handler must return a string.

### Set the process handler
```js
myModule.setProcessHandler(function(line) {
  // ...
});
```

### Get the process handler
```js
myModule.getProcessHandler();
// Function
```

### Remove the process handler
```js
myModule.removeProcessHandler();
```
