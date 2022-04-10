class Item {
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
    return this._id === id;
  }
}


class Customer extends Item {
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

// class Storage<T extends Item>
class Storage {
  constructor() {
    this._currId = 0;
    this._list = [];
  }

  _findIdx(id) {
    return this._list.findIndex((v) => (v.checkEqualId(id)));
  }

  insert(item) {
    try {
      item.id = this._currId;
      this._currId++;
      this._list.push(item);

      return true;
    } catch(err) {
      console.error(err);

      return false;
    }
    
  }

  deleteById(id) {
    const idx = this._findIdx(id);
    this._list = [
      ...this._list.slice(0, idx),
      ...this._list.slice(idx+1),
    ]
  }

  selectById(id) {
    const idx = this._findIdx(id);

    return this._list[idx] ? this._list[idx].getJSON() : {};
  }

  selectAll() {
    return this._list.map((v) => (v.getJSON()));
  }
}

module.exports = {
  Customer,
  customers: new Storage(),
}