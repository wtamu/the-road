(function (env, $, undefined) {

  // Monster Manual { name, hp, atk, def, gp, xp }
  const goblin = { name: 'Goblin', maxHp: 10, hp: 10, atk: 1, def: 0, gp: 1, xp: 1 },
        orc = { name: 'Orc', maxHp: 20, hp: 20, atk: 2, def: 0, gp: 1, xp: 2 },
        boss = { name: 'Boss', maxHp: 100, hp: 100, atk: 3, def: 1, gp: 5, xp: 5 }

  // Zones
  env.zones = [
    { id: 0, name: 'forest', monsters: [goblin, goblin, goblin, orc, boss] },
    { id: 1, name: 'cave', monsters: [orc, orc, goblin, orc, boss] },
    { id: 2, name: 'mountain', monsters: [boss, boss, boss, boss, boss] },
    { id: 3, name: 'maze', monsters: [boss, boss, boss, boss, boss] },
    { id: 4, name: 'volcano', monsters: [boss, boss, boss, boss, boss] },
    { id: 5, name: 'desert', monsters: [boss, boss, boss, boss, boss] },
    { id: 6, name: 'ocean', monsters: [boss, boss, boss, boss, boss] },
  ]

}(window.env = window.env || {}, jQuery));
