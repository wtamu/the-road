console.log(localStorage);

$(document).ready(function (evt) {
  Game.start().autosave();
  
  View.displayIncrementerValue(Game.objects.glyph, '#glyph');

  $('#glyph').on('change', function () {
  //   // console.log($(this).text());
    if ($(this).text() >= 7000) {
      $('#add').show();
      $('#glyph').off('change');
    }
  });

  // $('#glyph').trigger('change');
});