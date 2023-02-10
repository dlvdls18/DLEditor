# Events
## Listen to an event
```js
editor.addEventListener(/* Number : event type, Function */);
// undefined
```

# Event Types

<!--
  $EVENT_ON_INIT = 0;
  $EVENT_ON_INPUT = 1;
  $EVENT_ON_SCROLL = 2;
  $EVENT_ON_KEYDOWN = 3;
  $EVENT_ON_CLICK = 4;
  $EVENT_ON_UPDATE = 5;
  $EVENT_ON_TAB_VISIBLE = 6;
  $EVENT_ON_TAB_HIDDEN = 7;
  $EVENT_ON_TOKEN_REFRESHED = 8;
  $EVENT_ON_TOKEN_HIGHLIGHTED = 9;
  $EVENT_ON_TAB_REPOSITONED = 10;
  $EVENT_ON_DESTROY = 11;
-->

## On Initialize

Called when the editor is initialized
```js
DLEditor.$EVENT_ON_INIT;
```

## On Input

Called on input
```js
DLEditor.$EVENT_ON_INPUT;
```

## On Scroll

Called on editor scrolled both `x` and `y`
```js
DLEditor.$EVENT_ON_SCROLL;
```

## On Keydown

Called on key down
```js
DLEditor.$EVENT_ON_KEYDOWN;
```

## On Click

Called on editor clicked
```js
DLEditor.$EVENT_ON_CLICK;
```

## On Update

Called every tick
(Stop calling when instance is destroyed)
```js
DLEditor.$EVENT_ON_UPDATE;
```

## On Tab Visible

Called on tab is visible
```js
DLEditor.$EVENT_ON_TAB_VISIBLE;
```

## On Tab Hidden

Called on tab is hidden
```js
DLEditor.$EVENT_ON_TAB_HIDDEN;
```

## On Token Refreshed

Called on token refreshed
(Token is the local snippets on the tab)
```js
DLEditor.$EVENT_ON_TOKEN_REFRESHED;
```

## On Token Highlighted

Called on 
```js
DLEditor.$EVENT_ON_TOKEN_HIGHLIGHTED;
```
