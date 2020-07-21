(function (env, $, undefined) {

  // Monster Manual
  const goblin = { name: 'Goblin', hp: 10, atk: 1, def: 0 },
        orc = { name: 'Orc', hp: 20, atk: 2, def: 0 },
        boss = { name: 'Boss', hp: 100, atk: 3, def: 1 }

  // Zones
  env.zones = [
    { name: 'forest', monsters: [goblin, goblin, goblin, orc, boss] },
    { name: 'cave', monsters: [orc, orc, goblin, orc, boss] },
    { name: 'mountain', monsters: [boss, boss, boss, boss, boss] }
  ]

  env.getZone = function(zoneName) {
    return this.zones.find(zone => zone.name === zoneName);
  }

}(window.env = window.env || {}, jQuery));
