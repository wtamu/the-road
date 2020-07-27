class Monster {
  constructor(opts = { name: 'Monster', hp: 10, maxHp: 10, atk: 1, def: 0, gp: 1, xp: 1 }) {
    Object.keys(opts).forEach(key => { this[key] = opts[key] });
  }

  isDead() { return this.hp <= 0 }

  isAlive() { return !this.isDead() }

  attack(monster) { if (this.isAlive()) return monster.defend(this.atk) }

  defend(damage) { return this.hp -= damage - (this.def > damage ? damage : this.def) }
}

class Character extends Monster {
  constructor(opts = { name: 'Human', hp: 20, maxHp: 20, atk: 1, def: 0, gp: 0, xp: 0, lvl: 1 }) {
    super(opts);
  }

  loot(monster) { 
    this.xp += monster.xp; 
    this.gp += monster.gp; 
  }

  update() { /* lvl up? */ }
}

class Zone {
  constructor(opts = window.env.zones[0]) {
    this._constructor(opts);
  }

  _constructor(opts) {
    this.name = opts.name;
    this.index = window.env.zones.findIndex(zone => zone.name === this.name);
    this.monsters = opts.monsters.map(m => new Monster(m));
  }

  getZone(name) { return window.env.zones.find(zone => zone.name === name) }

  nextZone() {
    if (window.env.zones.length > this.index + 1) {
      this._constructor(window.env.zones[this.index + 1]);
      return true;
    }
    console.log(`You've beaten the last level! ${this.name}`);
    return false;
  }

  getMonster() { return this.monsters.find(monster => monster.isAlive()) }

  update(player) {

    let monster = this.getMonster();
    
    // Zone complete, load next
    if (!monster) {
      if (this.nextZone()) {
        console.log(`No more monsters... Loading next zone: ${this.name}`);
        this.update(player);
      }
      return;
    }

    // Exchange attacks
    player.attack(monster);
    monster.attack(player);
    console.log(`${this.name}: ${player.name} (${player.hp}) fights ${monster.name} (${monster.hp})!`);

    // Monster dead...
    if (monster.isDead()) {
      console.log(`${monster.name} is dead!`)
      player.loot(monster);
    }

    // Character dead...
    if (player.isDead()) {
      console.log(`Player is dead!`)
      player.hp = player.maxHp; // Recovery screen. For now reset to full hp
    }

    // Character alive and Monster alive. Repeat...
  }
}

/**
 * Strange Essence
 * Prismatic Essence
 * Eternal Essence
 */
class Incrementer {
  constructor(opts = { value: 0, increment: 1 }) {
    this.value = Number(opts.value);
    this.increment = Number(opts.increment);
  }

  changeValue(delta) { return this.value += delta }

  changeIncrement(delta) { return this.increment += delta }

  increment() { return this.value += this.increment }

  decrement() { return this.value -= this.increment }

}