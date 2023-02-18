// https://github.com/dlvdls18/DLEditor

DLEditor._pushBuilder("SyntaxHighlighterBuilder", class {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name.toString();
  }
  setName(name) {
    this.name = name;
  }
  setInitHandler(func) {
    this.init = func;
  }
  setProcessHandler(func) {
    this.process = func;
  }
  setFinalizeHandler(func) {
    this.finalize = func;
  }
  hasInitHandler() {
    return this.init !== undefined;
  }
  hasProcessHandler() {
    return this.process !== undefined;
  }
  hasFinalizeHandler() {
    return this.finalize !== undefined;
  }
  getInitHandler() {
    return this.init;
  }
  getProcessHandler() {
    return this.process;
  }
  getFinalizeHandler() {
    return this.finalize;
  }
  removeInitHandler() {
    delete this.init;
  }
  removeProcessHandler() {
    delete this.process;
  }
  removeFinalizeHandler() {
    delete this.finalize;
  }
  exportModule() {
    window.DLEditorModules.syntaxHighlighters[this.name] = this;
  }
});

DLEditor._pushBuilder("SnippetBuilder", class {
  allowLocal = true;
  items = [];
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name.toString();
  }
  setName(name) {
    this.name = name;
  }
  addItem(query, info, name) {
    this.items.push({
      query, info,
      name: name || query
    });
  }
  getItems() {
    return this.items;
  }
  setAllowLocal(bool) {
    this.allowLocal = bool;
  }
  getAllowLocal() {
    return this.allowLocal;
  }
  exportModule() {
    window.DLEditorModules.snippets[this.name] = this;
  }
});

DLEditor._pushBuilder("KeybindingsBuilder", class {
  keys = []
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name.toString();
  }
  setName(name) {
    this.name = name;
  }
  addKey(entrance, handler) {
    this.keys.push({ entrance, handler });
  }
  getKeys() {
    return this.keys;
  }
  exportModule() {
    window.DLEditorModules.snippets[this.name] = this;
  }
});

DLEditor._pushBuilder("ThemeBuilder", class {
  values = {};
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name.toString();
  }
  setName(name) {
    this.name = name;
  }
  setValue(key, value) {
    this.values[key] = value;
  }
  getValue(key) {
    return this.values[key];
  }
  removeValue(key) {
    delete this.values[key];
  }
  exportModule() {
    window.DLEditorModules.themes[this.name] = this;
  }
});

// Default modules
DLEditor.DefinedModules.DefaultSyntaxHighlighter = new DLEditor.SyntaxHighlighterBuilder("default");
DLEditor.DefinedModules.DefaultSyntaxHighlighter.setProcessHandler(function(raw) {
  raw = raw.replace(/\&nbsp\;/gi, `<span class="dl-defsh-spec">·</span>`);
  raw = raw.replace(/\t/gi, `<span class="dl-defsh-spec">――――――――</span>`);
  raw = raw.replace(/([0-9]+)/g, `<span class="dl-defsh-num">$1</span>`);
  return raw + `<span class="dl-defsh-spec">¬</span>`;
});
DLEditor.DefinedModules.DefaultSyntaxHighlighter.setFinalizeHandler(function(list) {
  var last = list.pop();
  list.push(last.substr(0, last.length - 36) + `<span class="dl-defsh-spec">¶</span>`);
  return list;
});
DLEditor.DefinedModules.DefaultSyntaxHighlighter.exportModule();

DLEditor.DefinedModules.DefaultSnippet = new DLEditor.SnippetBuilder("default");
DLEditor.DefinedModules.DefaultSnippet.addItem("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam laboriosam, ullam maiores, voluptas dolorum erro, nam modi nisi expedita libero numquam sit voluptatem blanditiis ipsa quod illum nihil molestias accusantium.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "lorem");
DLEditor.DefinedModules.DefaultSnippet.exportModule();

DLEditor.BuilderVersion = 2;
