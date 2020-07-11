const noop = function () { };

class Incrementer {
  constructor(opts = { value: 0, incrementBy: 1, delay: 1000 }) {
    this.value = Number(opts.value);
    this.incrementBy = Number(opts.incrementBy);
    this.delay = Number(opts.delay);
  }

  start() {
    this.start = noop;
    setInterval(() => { this.value += this.incrementBy; }, this.delay);
    return this;
  }

  changeValue(delta) {
    return this.value += Number(delta);
  }

  changeIncrementBy(delta) {
    return this.incrementBy += Number(delta);
  }
}

const _Database = {
  fields: {
    'glyph': Incrementer,
    'tome': Incrementer,
    'library': Incrementer,
    'temple': Incrementer
  },
  read: function () {
    const raw = JSON.parse(localStorage.getItem('glyphData')) || [];
    // init fields with classes, still need to start() the instances
    return Object.entries(raw).reduce((acc, entry) => {
      const [key, opts] = entry;
      const cls = this.fields[key] ? this.fields[key] : console.error(`Corrupted data! Field key not found: ${key}`);
      acc[key] = new cls(opts);
      return acc;
    }, {});
  },
  write: function (data) {
    localStorage.setItem('glyphData', JSON.stringify(data))
  },
  autosave: function (data, delay) {
    setInterval(() => { this.write(data) }, delay)
  }
};

const Game = {
  db: _Database,
  state: _Database.read(),
  autosave: function () { 
    this.db.autosave(this.state, 1000); 
    return this; 
  },
  _startFirstTime: function () {
    localStorage.clear();
    console.log('<<<=-=>>>Welcome to Glyph Idle!!!<<<=-=>>>');
    this.state = { 'glyph': new Incrementer().start() };
  },
  _startReturningUser: function () {
    console.log('<<<=-=>>>Welcome Back to Glyph Idle!!!<<<=-=>>>');
    Object.values(this.state).forEach(cls => cls.start());
  },
  start: function () {
    this.start = noop;
    localStorage.getItem('glyphData') ? this._startReturningUser() : this._startFirstTime();
    return this;
  },
  restart: function () { 
    this._startFirstTime(); 
    return this; 
  }
}