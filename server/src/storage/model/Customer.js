const Item = require('../Item');

module.exports = class Customer extends Item {
  constructor(id, name, email, age) {
    super(id);

    this.name = name;
    this.email = email;
    this.age = age;
  }

  getJSON() {
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      age: this.age,
    }
  }
}