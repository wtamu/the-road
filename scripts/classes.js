const LOCAL_STORAGE_KEY = 'glyphData';
const noop = function () { };

class Incrementer {
  constructor(opts = { value: 0, increment: 1, count: 1, delay: 1000 }) {
    this.value = Number(opts.value);
    this.increment = Number(opts.increment);
    this.count = Number(opts.count);
    this.delay = Number(opts.delay);
  }

  incrementBy() { return this.increment * this.count }

  changeValue(delta) { return this.value += delta }

  changeIncrement(delta) { return this.increment += delta }

  changeCount(delta) { return this.count += delta }

  start() {
    this.start = noop;
    setInterval(() => { this.value += this.incrementBy(); }, this.delay);
    return this;
  }
}

const Model = {
  fields: {
    'glyph': Incrementer,
    'tome': Incrementer,
    'library': Incrementer,
    'temple': Incrementer
  },

  read: function () {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  },

  write: function (data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
  },

  autosave: function (data, delay) {
    setInterval(() => { this.write(data) }, delay)
  },

  initializeObjects: function () {
    // { key1: {opts}, key2: {opts}, ...}
    const serialized = this.read();

    const objects = Object.entries(serialized).reduce((acc, entry) => {
      const [key, opts] = entry;
      const cls = this.fields[key];
      
      if (cls) {
        acc[key] = new cls(opts);
        return acc;
      }

      console.error(`Corrupted data! Field key not found: ${key}`);

    }, {});

    return objects;
  }
};

const View = {
  displayIncrementerValue: function (inc, id) {
    setInterval(function () {
      $(id).text(inc.value).change();
    }, inc.delay);
  }
};

const Game = {
  model: Model,
  view: View,
  objects: Model.initializeObjects(),

  _startNewGame: function () {
    localStorage.clear();
    this.objects = { 'glyph': new Incrementer().start() };
  },

  _startSavedGame: function () {
    Object.values(this.objects).forEach(cls => cls.start());
  },

  start: function () {
    this.start = noop;
    localStorage.getItem(LOCAL_STORAGE_KEY) ? this._startSavedGame() : this._startNewGame();
    return this;
  },

  restart: function () {
    this._startNewGame();
    return this;
  },

  autosave: function () {
    this.model.autosave(this.objects, 1000);
    return this;
  }
}