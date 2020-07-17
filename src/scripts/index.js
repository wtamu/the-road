const Game = {

  model: Model,

  objects: Model.initializeObjects(),

  init: function () {
    this.start = NOOP;
    if ( !localStorage.getItem(LOCAL_STORAGE_KEY) ) this.objects = { 'gp': new Incrementer() }
    return this;
  },

  update: function () { 
    // Object.values(this.objects).forEach(cls => cls.update());
  },

  render: function () {
    // move this type of render to View class?
    $('#glyph').text(this.objects.gp.value).change();
    // Object.values(this.objects).forEach(cls => cls.render());
  },

  loop: function () {
    setInterval(() => {
      this.update();
      this.render();
    }, 1000);
    return this;
  },

  autosave: function () {
    this.model.autosave(this.objects, 1000);
    return this;
  }
}


$(function() {
  console.log(localStorage);
  Game.init().loop().autosave();
});

  // $('#glyph').on('change', function () {
  //   if ($(this).text() >= 7000) {
  //     $('#add').show();
  //     $('#glyph').off('change');
  //   }
  // });