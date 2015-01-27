/* jshint strict:false */
var Hashmapper = function () {
  this._map = Object.create(null);
  this._index = [];
};

Hashmapper.prototype = {
  add: function (name, value) {
    if (!name) {
      return false;
    }

    // record view or whatever value is if given
    // it enable the developer to record any data under the view cid
    this._map[name] = value;
    this._index.push(name);

    return this;
  },

  get: function (name) {
    return name ? this._map[name] : false;
  },

  remove: function (name) {
    var value = this.get(name);
    if (value) {
      delete this._map[name];

      // check in case of index might have been corrupted
      var index = this._index.indexOf(name);

      // also remove name from index
      if (-1 !== index) {
        this._index.splice(index, 1);
      }
    }

    return value;
  },

  last: function () {
    return this.get(this._index[this._index.length - 1]);
  },

  // This method return a range between name1 and name2
  range: function (name1, name2, options) {
    var index1 = 0;
    var index2;

    // validate second index defaulting to max index
    index2 = name2 ? this._index.indexOf(name2) : this._index.length - 1;
    if (-1 === index2) {
      index2 = this._index.length - 1;
    }

    // validate first index defaulting to 0
    index1 = name1 ? this._index.indexOf(name1) : 0;
    if (-1 === index1) {
      index1 = 0;
    }

    // swap index
    if (index1 > index2) {
      var temp = index1;
      index1 = index2;
      index2 = temp;
    }

    // avoid underflow or overflow
    // Beware of Array.proto.slice which does not go to the bounds unless using undefined
    index1 = 0 >= index1 ? 0 : index1;
    index2 = index2 >= this._index.length - 1 ? undefined : index2;

    var excludeStart = options && true === options.excludeStart;
    var excludeEnd = options && true === options.excludeEnd;

    // update indexes based on exclusion options
    index1 = excludeStart ? index1 + 1 : index1;
    index2 = excludeEnd ? undefined === index2 ? this._index.length : index2 - 1 : index2;

    // return array between index1 and index2 (included)
    var indexes = this._index.slice(index1, index2);

    var keys = Object.keys(this._map);
    var index = 0;
    var length = keys.length;
    var range = [];
    var key;

    for (; length > index; index += 1) {
      key = keys[index];
      if (-1 !== indexes.indexOf(key)) {
        range.push(this._map[key]);
      }
    }

    return range;
  },

  invertedRange: function (name1, name2, options) {
    var range = this.range(name1, name2, options);
    var newRange = [];
    var length = range.length;
    var index = length - 1;

    for (; 0 <= index; index -= 1) {
      newRange.push(range[index]);
    }
    return newRange;
  },

  at: function (index) {
    var len = this._index.length;
    if (!len) {
      return null;
    }

    if (0 > index) {
      return len >= -index ? this.get(this._index[len + index]) : null;
    }
    return 0 <= index && len > index ? this.get(this._index[index]) : null;
  },

  length: function () {
    return this._index.length;
  },

  isEmpty: function () {
    return this._index.length === 0;
  },

  iter: function (fn, ctx) {
    var index = 0;
    var length = this._index.length;

    for (; length > index; index += 1) {
      fn.call(ctx, index, this._index[index]);
    }
  },

  iterDown: function (fn, ctx) {
    var length = this._index.length;
    var index = length - 1;

    for (; 0 <= index; index -= 1) {
      fn.call(ctx, index, this._index[index]);
    }
  },

  loop: function (fn) {
    var self = this;
    this.iter(function (index, name) {
      fn(self.get(name));
    });
  },

  loopDown: function (fn) {
    var self = this;
    this.iterDown(function (index, name) {
      fn(self.get(name));
    });
  },

  loopDownUntil: function (fn, predicate) {
    var item;
    var result;
    var self = this;

    this.iterDown(function (index, name) {
      item = self.get(name);
      result = fn(item);
      return typeof predicate === 'function' ? predicate(result) : predicate === result;
    });

    return result;
  }
};
