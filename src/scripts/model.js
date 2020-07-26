const Model = {
  schema: {
    'char': Character,
    'zone': Zone
  },

  read: function () {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    } catch (e) {
      console.log('LocalStorage data not found: ' + e);
      return false;
    }
  },

  write: function (data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  },

  autosave: function (data, delay) {
    setInterval(() => { this.write(data) }, delay)
  },

  _loadNewGame: function () {
    // Load new state from Model schema
    console.log('Loading new game...');
    return Object.entries(this.schema).reduce((acc, entry) => {
      const [key, cls] = entry;
      acc[key] = new cls();
      return acc;
    }, {});
  },

  _loadSaveGame: function (saveData) {
    // Load save state from local storage
    console.log('Loading save game...');
    try {
      return Object.entries(saveData).reduce((acc, entry) => {
        const [key, opts] = entry;
        const cls = this.schema[key];

        if (cls) {
          acc[key] = new cls(opts);
          return acc;
        }

        console.error(`Key '${key}' not found! Corrupt data or missing field.`);

      }, {});
    } catch (e) {
      console.log(`Error Loading Save Game: ${e}`);
      return this._loadNewGame();
    }
  },

  init: function () {
    const saveData = this.read(); // { key1: {opts}, key2: {opts}, ...}

    return (saveData && !$.isEmptyObject(saveData))
      ? this._loadSaveGame(saveData)
      : this._loadNewGame();
  }
};