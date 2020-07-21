const Game = {

  env: window.env,

  objects: Model.init(),

  update: function () {
    // this.objects.char.update(monster);
    // Object.values(this.objects).forEach(cls => cls.update());
  },

  render: function () {
    // move this type of render to View class?
    // $('#glyph').text(this.objects.gp.value).change();
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
    Model.autosave(this.objects, 1000);
    return this;
  }
}


$(function () {
  console.log(localStorage);
  Game.loop().autosave();
});

  // $('#glyph').on('change', function () {
  //   if ($(this).text() >= 7000) {
  //     $('#add').show();
  //     $('#glyph').off('change');
  //   }
  // });