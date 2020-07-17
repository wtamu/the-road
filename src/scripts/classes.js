/**
 * Classes with no dependencies.
 */

class Incrementer {
  constructor(opts = { value: 0, increment: 1 }) {
    this.value = Number(opts.value);
    this.increment = Number(opts.increment);
  }

  changeValue(delta) { return this.value += delta }

  changeIncrement(delta) { return this.increment += delta }

  increase() { return this.value += this.increment }

  decrease() { return this.value -= this.increment }

}

class Monster {
  constructor(opts = { hp: 1, atk: 1, def: 0 }) {
    this.hp = hp;
    this.atk = atk;
    this.def = def;
  }
}

class Character {
  constructor(opts = { hp: 10, atk: 1, def: 0, xp: 0 }) {
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.xp = xp;
  }
}

/**
 * Gold
 * Strange Essence
 * Prismatic Essence
 * Eternal Essence
 */