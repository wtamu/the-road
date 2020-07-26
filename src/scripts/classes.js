class Monster {
  constructor(opts = { name: 'Monster', maxHp: 10, hp: 10, atk: 1, def: 0, gp: 1, xp: 1 }) {
    this.name = opts.name;
    this.maxHp = opts.maxHp;
    this.hp = opts.hp;
    this.atk = opts.atk;
    this.def = opts.def;
    this.gp = opts.gp;
    this.xp = opts.xp;
  }

  isDead() { return this.hp <= 0 }

  isAlive() { return !this.isDead() }

  attack(monster) {
    // console.log(`${this.name} attacking ${monster.name}!`);
    if (monster.isAlive()) monster.takeDamage(this.atk);
  }

  takeDamage(damage) {
    this.hp -= damage - (this.def > damage ? damage : this.def)
    // console.log(`${this.name} has ${this.hp} HP!`);
  }
}

class Character extends Monster {
  constructor(opts = { name: 'Human', maxHp: 20, hp: 20, atk: 1, def: 0, gp: 0, xp: 0, lvl: 1 }) {
    super(opts);
    this.maxHp = opts.maxHp
    this.lvl = opts.lvl;
  }

  loot(monster) {
    console.log(`Looting ${monster.name}!`);
    this.xp += monster.xp;
    this.gp += monster.gp;
  }

  update(monster) {
    if (!monster) return;

    // Exchange attacks
    this.attack(monster);
    monster.attack(this);

    // Monster dead...
    if (monster.isDead()) {
      // console.log(`${monster.name} is dead!`);
      this.loot(monster);
    }

    // Character dead...
    if (this.isDead()) {
      // console.log(`${this.name} is dead!`);
      this.hp = this.maxHp; // Recovery screen. For now reset to full hp
    }

    // Character alive and Monster alive. Do nothing...
  }
}

class Zone {
  constructor(opts = window.env.zones[0]) {
    this.id = opts.id;
    this.name = opts.name;
    this.monsters = opts.monsters.map(m => new Monster(m));
  }

  getMonster() {
    // All monsters are dead
    if (this.monsters[0].isDead() && this.monsters.length == 1) {
      console.log('Defeated all monsters!');
      return this.monsters.shift();
    }

    // Monster is dead, get next monster
    if (this.monsters[0].isDead()) {
      this.monsters.shift();
      return this.monsters[0];
    }

    return this.monsters[0];
  }

  nextZone() {
    const nextZone = window.env.zones[this.id + 1];
    if (nextZone) {
      return new Zone(nextZone);
    }
  }

  getZoneByName(zoneName) {
    const zone = window.env.zones.find(zone => zone.name === zoneName);
    if (zone) {
      return new Zone(zone);
    }
  }

  isDefeated() { return this.monsters.length == 1 && this.monsters[0].isDead() }
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