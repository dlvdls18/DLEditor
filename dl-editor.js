// https://github.com/dlvdls18/DLEditor

class DLEditor {
  static VERSION = 1;
  static DefinedModules = {};
  static _pushBuilder(name, builder) {
    DLEditor[name] = builder;
  }
  static $EVENT_ON_INIT = 0;
  static $EVENT_ON_INPUT = 1;
  static $EVENT_ON_SCROLL = 2;
  static $EVENT_ON_KEYDOWN = 3;
  static $EVENT_ON_CLICK = 4;
  static $EVENT_ON_UPDATE = 5;
  static $EVENT_ON_TAB_VISIBLE = 6;
  static $EVENT_ON_TAB_HIDDEN = 7;
  static $EVENT_ON_TOKEN_REFRESHED = 8;
  static $EVENT_ON_LINE_HIGHLIGHTED = 9;
  static $EVENT_ON_TAB_REPOSITONED = 10;
  static $EVENT_ON_DESTROY = 11;
  static $EVENT_ON_LINE_HIGHLIGHTED = 12;
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
  static $MODULE_HIGHLIGHTER = "syntaxHighlighters";
  static $MODULE_SNIPPET = "snippets";
  static $MODULE_KEYBINDING = "keybindings";
  static $MODULE_THEME = "themes";
  _eventHandlers = [];
  _lastLineSelection = -1;
  _enteredChars = "";
  _localTokens = [];
  _tabVisible = false;
  _tabMultiplierY = 16;
  _readOnly = false;
  _savedInstance = {};
  isDestroyed = false;
  syntaxHighlighter = null;
  snippet = null;
  keybindings = null;
  theme = null;
  constructor(node) {
    node.classList.add("dl-editor");
    var lines = document.createElement("div");
    var wrapper = document.createElement("div");
    var pre = document.createElement("div");
    var input = document.createElement("textarea");
    var highlight = document.createElement("div");
    var tab = document.createElement("div");
    lines.classList.add("dl-lines");
    wrapper.classList.add("dl-wrapper");
    pre.classList.add("dl-pre");
    input.classList.add("dl-input");
    highlight.classList.add("dl-line-highlight");
    tab.classList.add("dl-tab");
    lines.innerText = 1;
    input.wrap = "off";
    wrapper.appendChild(pre);
    wrapper.appendChild(input);
    node.appendChild(highlight);
    node.appendChild(lines);
    node.appendChild(wrapper);
    node.appendChild(tab)
    this._element = node;
    this._elemLines = lines;
    this._elemWrapper = wrapper;
    this._elemPre = pre;
    this._elemInput = input;
    this._elemLineHighlight = highlight;
    this._elemTab = tab;
    var onInput = this._onInput;
    var onScroll = this._onScroll;
    var updateLineHighlight = this._updateLineHighlight;
    var instance = this;
    input.oninput = function(evt) {
      onInput.call(instance, evt);
    }
    input.onscroll = function() {
      onScroll.call(instance);
    }
    input.onclick = function() {
      updateLineHighlight.call(instance);
    }
    this._frameUpdate.call(this);
    this._elemInput._dl_instance = this;
    this._elemInput.onclick = function(evt) {
      evt.target._dl_instance.hideTab.call(evt.target._dl_instance);
    }
    this._element.onkeydown = function(evt) {
      evt.target._dl_instance._onKeyDown(evt);
    }
    this._triggerEventHandler.call(this, DLEditor.EVENT_ON_INIT, {
      node, tab, input, wrapper,
      lines, pre, highlight
    });
  }
  _onInput(evt) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var value = this._elemInput.value;
    var rawLines = "";
    for(var i = 0; i < value.split("\n").length; i++) {
      rawLines += (i + 1) + "<br>";
    }
    this._elemLines.innerHTML = rawLines;
    value = value.replaceAll("&", "&amp;");
    value = value.replaceAll("<", "&lt;");
    value = value.replaceAll(">", "&gt;");
    value = value.replaceAll(" ", "&nbsp;");
    value = this._parseValue(value);
    value = value.replaceAll("\n", "<br>");
    this._elemPre.innerHTML = value + "<br>";
    this._updateLineHighlight();
    this._updateLocalToken.call(this, evt.data);
    if((evt.data || "").match(/[^a-z0-9]/i) == null && (evt.data || "").length > 0) {
      this._enteredChars = evt.data || "";
      this._updateSnippetList.call(this);
    } else {
      this.hideTab.call(this);
      this._enteredChars = "";
      this._updateLocalToken.call(this);
    }
    this._triggerEventHandler.call(this, DLEditor.EVENT_ON_INPUT, {
      event: evt,
      preValue: value,
      lines: rawLines
    });
  }
  _onScroll(evt) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var x = this._elemInput.scrollLeft;
    var y = this._elemInput.scrollTop;
    this._elemPre.scroll(x, y);
    this._elemLines.scroll(0, y);
    this._updateLineHighlight();
    this._updateTabPosition.call(this);
    this._triggerEventHandler.call(this, DLEditor.EVENT_ON_SCROLL, {
      event: evt,
      scrollX: x,
      scrollY: y
    });
  }
  _updateLineHighlight() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var line = this.getSelectionRow();
    this._lineHighlightOffset = (16 * line) + 8;
    this._elemLineHighlight.style.top = (this._lineHighlightOffset - this._elemInput.scrollTop) + "px";
    var inputY = this._elemInput.getBoundingClientRect().y + this._elemInput.getBoundingClientRect().height;
    var lineY = this._elemLineHighlight.getBoundingClientRect().y + this._elemLineHighlight.getBoundingClientRect().height;
    if(inputY <= lineY) {
      this.hideLineHighlight.call(this);
    } else {
      this.showLineHighlight.call(this);
      this._triggerEventHandler.call(this, DLEditor.EVENT_ON_LINE_HIGHLIGHTED, {
        line,
        value: this._lineHighlightOffset - this._elemInput.scrollTop
      });
    }
  }
  _frameUpdate() {
    if(!this.isDestroyed) {
      var instance = this;
      requestAnimationFrame(function() {
        instance._frameUpdate.call(instance);
      });
    } else return;
    var lastLine = this._lastLineSelection;
    var line = this.getSelectionRow();
    var selectionStart = this._elemInput.selectionStart;
    var selectionEnd = this._elemInput.selectionEnd;
    if(selectionStart != selectionEnd) this.hideLineHighlight.call(this);
    else this.showLineHighlight.call(this);
    if(lastLine != line) {
      this._updateLineHighlight.call(this);
      lastLine = line;
    }
    this._triggerEventHandler.call(this, DLEditor.EVENT_ON_UPDATE, {});
  }
  _parseValue(value) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    if(this.syntaxHighlighter == null) return value;
    var highlighter = window.DLEditorModules.syntaxHighlighters[this.syntaxHighlighter] || {};
    if(highlighter["init"] != null) value = highlighter.init(value, this) || value;
    var valueLines = [];
    value.split("\n").forEach(function(line, lineIndex) {
      if(highlighter["process"] != null) {
        valueLines.push(highlighter.process(line, lineIndex));
      } else {
        valueLines.push(line);
      }
    });
    if(highlighter["finalize"] != null) valueLines = highlighter.finalize(valueLines);
    return valueLines.join("\n");
    this._triggerEventHandler.call(this, DLEditor.EVENT_ON_TOKEN_HIGHLIGHTED, {
      value: valueLines,
      highlighter
    });
  }
  _updateSnippetList() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    if(this._enteredChars.length < 2) return this.hideTab();
    this._tabVisible = true;
    var ins = this.snippets == null ? {
      items: [],
      allowLocal: true
    } : window.DLEditorModules.snippets[this.snippets];
    this._elemTab.style.display = "block";
    function highlightQuery(item) {
      var html = "";
      html += item.substr(0, item.toLowerCase().indexOf(query));
      html += `<span class="dl-tab-query-highlight">`;
      html += item.substr(item.toLowerCase().indexOf(query), query.length);
      html += `</span>`;
      html += item.substr(item.toLowerCase().indexOf(query) + query.length, item.length);
      return html;
    }
    var addrLocal = {};
    var addr = {};
    var addrInfo = {};
    this._queryAddrLocal = {};
    this._queryAddr = {};
    var query = this._enteredChars.toLowerCase();
    var html = "";
    if(ins.allowLocal) this._localTokens.filter(function(item) {
      return item.toLowerCase().includes(query);
    }).forEach(function(item, index) {
      addrLocal[index] = item;
      html += `<li class="dl-tab-item" data-dl-local-query="${index}">`;
      html += `<p class="dl-tab-query"><span class="dl-query-badge">L</span>${highlightQuery(item)}</p>`;
      html += `</li>`;
    });
    ins.items.filter(function(item) {
      return item.query.toLowerCase().includes(query);
    }).forEach(function(item, index) {
      addr[index] = item.query;
      addrInfo[index] = item.info;
      html += `<li class="dl-tab-item" data-dl-query="${index}">`;
      html += `<p class="dl-tab-query"><span class="dl-query-badge">S</span>${highlightQuery(item.name)}</p>`;
      if(item["info"] != null) html += `<p class="dl-tab-info" data-dl-tab-info>${item.info}</p>`;
      html += `</li>`;
    });
    this._elemTab.innerHTML = html;
    if(Object.keys(addr).length == 1 && addrInfo[0] != null) {
      this._elemTab.querySelector(`[data-dl-tab-info]`).style.display = "block";
    }
    if(html.length == 0) this.hideTab.call(this);
    var insert = this._insertQuery;
    this._queryAddr = addr;
    this._queryAddrLocal = addrLocal;
    this._elemTab._dl_instance = this;
    this._elemTab.addEventListener("click", function(evt) {
      var px = evt.pageX;
      var py = evt.pageY;
      var el = this;
      while(!el.classList.contains("dl-tab")) el = el.parentNode;
      el.querySelectorAll("li").forEach(function(el) {
        var x = el.getBoundingClientRect().x;
        var y = el.getBoundingClientRect().y;
        var w = el.getBoundingClientRect().width;
        var h = el.getBoundingClientRect().height;
        if(px >= x && py >= y && px <= (x + w) && py <= (y + h)) {
          if(el.getAttribute("data-dl-query") != null) {
            insert.call(el.parentNode._dl_instance, el.parentNode._dl_instance._queryAddr[el.getAttribute("data-dl-query")]);
          } else {
            insert.call(el.parentNode._dl_instance, el.parentNode._dl_instance._queryAddrLocal[el.getAttribute("data-dl-local-query")]);
          }
          el.parentNode._dl_instance._elemInput.focus();
        }
      });
      el._dl_instance.hideTab();
    });
    this._updateTabPosition.call(this);
    this._triggerEventHandler.call(this, DLEditor.EVENT_ON_TAB_VISIBLE, {
      raw: html,
      address: addr,
      localAddress: addrLocal,
      query
    });
  }
  _updateLocalToken(ignore) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var tokens = [];
    var cur = "";
    Array.from(this._elemInput.value).forEach(function(char) {
      if(char.match(/[a-z0-9]/i)) cur += char;
      else {
        if(cur.length != 0 && !tokens.includes(cur) && cur != ignore) tokens.push(cur);
        cur = "";
      }
    });
    this._localTokens = tokens;
    this._triggerEventHandler.call(this, DLEditor.EVENT_ON_TOKEN_REFRESHED, {
      tokens
    });
  }
  _insertQuery(text) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var val = this.getValue();
    var sel = this._elemInput.selectionStart;
    var selEnd = this._elemInput.selectionEnd;
    var ent = this._enteredChars;
    var start = val.substr(0, sel - ent.length);
    var end = val.substr(sel, val.length);
    this.setValue(start + text + end);
    var ins = this;
    ins._elemInput.selectionStart = sel + text.length - 2;
    ins._elemInput.selectionEnd = selEnd + text.length - 2;
  }
  _onKeyDown(evt) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var bind = window.DLEditorModules[this.keybindings];
    if(bind == null) return;
    var ins = this;
    bind.keys.forEach(function(b) {
      if(b.entrance({
        key: evt.keyCode,
        alt: evt.altKey,
        ctrl: evt.ctrlKey,
        shift: evt.shiftKey,
        meta: evt.metaKey,
        repeating: evt.repeating,
        composing: evt.isComposing
      }) == true) {
        b.handler(ins, evt);
      }
    });
    this._triggerEventHandler.call(this, DLEditor.EVENT_ON_KEYDOWN, {
      keybindings: bind,
      event: evt
    });
  }
  _updateTabPosition() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    if(!this._tabVisible) return;
    this._elemTab.style.top = ((((this.getSelectionRow() + 1) * this._tabMultiplierY) + 8) - this._elemInput.scrollTop) + "px";
    var tabY = this._elemTab.getBoundingClientRect().y + this._elemTab.getBoundingClientRect().height;
    var inputY = this._elemInput.getBoundingClientRect().y + this._elemInput.getBoundingClientRect().height;
    this._elemTab.style.top = (((((this.getSelectionRow() + 1) * this._tabMultiplierY) + 8) - this._elemInput.scrollTop) + (tabY >= inputY - 5 ? (inputY - tabY) - 5 : 0)) + "px";
    if(tabY <= this._elemInput.getBoundingClientRect().y) this.hideTab.call(this);
    this._triggerEventHandler.call(this, DLEditor.EVENT_ON_TAB_REPOSITONED, {
      tab: tabY,
      input: inputY,
      value: (((this.getSelectionRow() + 1) * DLEditor.TAB_MULTIPLIER_Y) + 8) - this._elemInput.scrollTop
    });
  }
  _triggerEventHandler(evt, args) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var ins = this;
    this._eventHandlers.forEach(function(h) {
      if(h.event == evt) h.handler.call(ins, args);
    });
  }
  _applyThemeVar(key, value) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this._element.style.cssText += `--dl-${key}: ${value};`;
  }
  getSelectionRow() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var lines = this._elemInput.value.split("\n");
    var line = 0;
    var pos = 0;
    for(var i = 0; i < this._elemInput.selectionStart; i++) {
      pos++;
      if(pos > lines[line].length) {
        line++;
        pos = 0;
      }
    }
    return line;
  }
  hideLineHighlight() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this._elemLineHighlight.style.display = "none";
  }
  showLineHighlight() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this._elemLineHighlight.style.display = "block";
  }
  destroy() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this.isDestroyed = true;
    this._element.remove();
  }
  hideTab() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this._elemTab.style.display = "none";
    this._tabVisible = false;
    this._triggerEventHandler.call(this, DLEditor.EVENT_ON_TAB_HIDDEN, {});
  }
  setValue(value) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var el = this._elemInput;
    el.value = value;
    this._onInput.call(this, {
      data: value
    });
  }
  getValue() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    return this._elemInput.value.toString();
  }
  insert(value) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var raw = this.getValue();
    var el = this._elemInput;
    this.setValue(raw.substr(0, el.selectionStart) + value + raw.substr(el.selectionStart, raw.length));
  }
  getSelectionColumn() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var lines = this._elemInput.value.split("\n");
    var res = 0;
    var pos = 0;
    var off = 0;
    for(var i = 0; i < this._elemInput.selectionStart - this.getSelectionRow.call(this); i++) {
      if(lines[pos].length == i - off) {
        off += lines[pos].length;
        pos++;
        res = 0;
      }
      res++;
    }
    return res;
  }
  applyTheme(theme) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this.theme = theme;
    var t = window.DLEditorModules.themes[theme];
    if(t == null) return;
    for(var i in t.values) {
      this._applyThemeVar(i, t.values[i]);
    }
  }
  applySyntaxHighlighter(highlighter) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this.syntaxHighlighter = highlighter;
    this._onInput({});
  }
  applyKeybinding(keybinding) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this.keybindings = keybinding;
    var k = window.DLEditorModules.keybindings[keybinding];
    if(k == null) return;
    if(k["init"] != null) k.init(this);
  }
  applySnippet(snippet) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this.snippets = snippet;
  }
  getTheme() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    return this.theme.toString();
  }
  getSyntaxHighlighter() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    return this.syntaxHighlighter.toString();
  }
  getKeybinding() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    return this.keybindings.toString();
  }
  getSnippet() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    return this.snippets.toString();
  }
  addEventListener(type, func) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this._eventHandlers.push({
      event: type,
      handler: func
    });
  }
  setReadOnly(bool) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this._readOnly = bool;
    if(bool) this._elemInput.setAttribute("readonly", "");
    else this._elemInput.removeAttribute("readonly");
  }
  isReadOnly() {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    return this._readOnly;
  }
  saveInstance(label) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    this._savedInstance[label] = {
      syntaxHighlighter: this.syntaxHighlighter,
      snippets: this.snippets,
      keybindings: this.keybindings,
      theme: this.theme,
      value: this.getValue(),
      selectionStart: this._elemInput.selectionStart,
      selectionEnd: this._elemInput.selectionEnd
    }
    this.syntaxHighlighter = null;
    this.snippets = null;
    this.keybindings = null;
    this.theme = null;
    this.setValue("");
  }
  restoreInstance(label) {
    if(this.isDestroyed == true) throw new Error("Instance is destroyed, cannot perform this action");
    var ins = this._savedInstance[label];
    this.applySyntaxHighlighter(ins.syntaxHighlighter);
    this.applySnippet(ins.snippets);
    this.applyKeybinding(ins.keybindings);
    this.applyTheme(ins.theme);
    this.setValue(ins.value);
    this._elemInput.selectionStart = ins.selectionStart;
    this._elemInput.selectionEnd = ins.selectionEnd;
  }
}

window.DLEditorModules = {
  syntaxHighlighters: {},
  snippets: {},
  keybindings: {},
  themes: {}
}

DLEditor.DLEditorModules = DLEditorModules;
