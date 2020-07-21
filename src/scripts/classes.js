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

  attack(monster) {
    console.log(`${this.name} attacking ${monster.name}!`);
    if (monster.isAlive) monster.takeDamage(this.atk);
  }

  takeDamage(damage) {
    this.hp -= damage - (this.def > damage ? damage : this.def)
    console.log(`${this.name} has ${this.hp} HP!`);
  }
}

class Character extends Monster {
  constructor(opts = { name: 'Human', maxHp: 20, hp: 20, atk: 1, def: 0, gp: 0, xp: 0, lvl: 1 }) {
    super(opts);
    this.lvl = opts.lvl;
  }

  loot(monster) {
    console.log(`Looting ${monster.name}!`);
    this.xp += monster.xp;
    this.gp += monster.gp;
  }

  update(monster) {
    if (!monster) return false;

    // Exchange attacks
    this.attack(monster);
    monster.attack(this);

    // Character dead...
    if (this.isDead()) {
      console.log(`${this.name} is dead!`);
      this.hp = this.maxHp; // Recovery screen. For now reset to full hp
      return;
    }

    // Character alive and Monster dead...
    if (monster.isDead()) {
      console.log(`${monster.name} is dead!`);
      this.loot(monster);
      monster.hp = monster.maxHp; // load next monster. For now reset to full hp
      return;
    }

    // Character alive and Monster alive. Do nothing...
    console.log(`${this.name} and ${monster.name} are not dead!`);
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