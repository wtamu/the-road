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

  update() { return this.value += this.increment }

}