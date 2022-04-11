module.exports = class Item {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value
  }

  checkEqualId(id) {
    return this._id === parseInt(id);
  }
}
