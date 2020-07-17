/**
 * Data layer.
 */

 const Schema = {
  'gp': Incrementer
 }


const Model = {
  schema: Schema,

  read: function () {
    // const serialized = localStorage.getItem(LOCAL_STORAGE_KEY);
    // return serialized ? JSON.parse(serialized) : [];
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
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