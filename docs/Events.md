# Events
## Listen to an event
```js
editor.addEventListener(/* Number : event type, Function */);
// undefined
```

## What is events
DLEditor events are a simple event mock-up useful for modules.
DLEditor uses the element's `click`, `scroll` and `input` events which affects the whole editor when removed or modified.
You can add many functions on one event, they are in `_eventHandlers`.

# Event Types
## On Initialize

Called when the editor is initialized
```js
DLEditor.$EVENT_ON_INIT;
```

## On Input

Called on input.
```js
DLEditor.$EVENT_ON_INPUT;
```

## On Scroll

Called when editor is scrolled both `x` and `y`.
```js
DLEditor.$EVENT_ON_SCROLL;
```

## On Keydown

Called on key down.
```js
DLEditor.$EVENT_ON_KEYDOWN;
```

## On Click

Called when editor is clicked.
```js
DLEditor.$EVENT_ON_CLICK;
```

## On Update

Called every tick.
(Stop calling when instance is destroyed)
```js
DLEditor.$EVENT_ON_UPDATE;
```

## On Tab Visible

Called when tab is visible.
```js
DLEditor.$EVENT_ON_TAB_VISIBLE;
```

## On Tab Hidden

Called when tab is hidden.
```js
DLEditor.$EVENT_ON_TAB_HIDDEN;
```

## On Token Refreshed

Called when tokens are refreshed.
(Token is the local snippets on the tab)
```js
DLEditor.$EVENT_ON_TOKEN_REFRESHED;
```

## On Line Highlighted

Called when line highlight is visible.
(Act as a OnUpdate but only called when the line is visible)
```js
DLEditor.$EVENT_ON_LINE_HIGHLIGHTED;
```

## On Tab Repositioned

Called when the tab position is changed
```js
DLEditor.$EVENT_ON_TAB_REPOSITIONED;
```

## On Destroy

Called when the instance is destroyed
```js
DLEditor.$EVENT_ON_DESTROY;
```
