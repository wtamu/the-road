console.log(localStorage);

$(document).ready(function (evt) {
  Game.start().autosave();

  function displayIncrementerValue() {
    setInterval(function () {
      $('#glyph').text(Game.state.glyph.value);
    }, Game.state.glyph.delay);
  }

  displayIncrementerValue();
});