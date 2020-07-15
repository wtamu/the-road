/**
 * Data layer.
 */

 const Schema = {
  'stone': Incrementer
 }


const Model = {
  schema: Schema,

  read: function () {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  },

  write: function (data) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
  },

  autosave: function (data, delay) {
    setInterval(() => { this.write(data) }, delay)
  },

  initializeObjects: function () {
    // { key1: {opts}, key2: {opts}, ...}
    const serialized = this.read();

    return Object.entries(serialized).reduce((acc, entry) => {
      const [key, opts] = entry;
      const cls = this.schema[key];
      
      if (cls) {
        acc[key] = new cls(opts);
        return acc;
      }

      console.error(`Key '${key}' not found! Corrupt data or missing schema.`);

    }, {});
  }
};