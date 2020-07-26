const Game = {

  env: window.env,

  objects: Model.init(),

  update: function () {
    // TODO: this is really messy, figure out how to manage the monster queue
    if (this.objects.zone.isDefeated()) {
      let zone = this.objects.zone.nextZone();
      this.objects.zone = zone ? zone : this.objects.zone.getZoneByName('forest');
      console.log(`updating zone... ${this.objects.zone.name}`);
    }

    let monster = this.objects.zone.getMonster();
    let char = this.objects.char;

    console.log(`Monsters: ${this.objects.zone.monsters}`);
    char.update(monster);
    console.log(`Char: ${char.hp} | Monster: ${monster.name}, ${monster.hp}`);
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