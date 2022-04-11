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
    ];
  }

  selectById(id) {
    const idx = this._findIdx(id);
    return this._list[idx] ? this._list[idx].getJSON() : null;
  }

  selectAll() {
    return this._list.map((v) => (v.getJSON()));
  }
}

module.exports = {
  customerStorage: new Storage(),
}