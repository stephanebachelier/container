# container

[![Build Status](https://secure.travis-ci.org/stephanebachelier/container.png?branch=master)](http://travis-ci.org/stephanebachelier/container)

Another hashmap like implementation

## Installation

### Browser
```
$ bower install --save container
```

### Node
```
$ npm install --save container
```

## Usage

## Documentation

`Container` is a kind of hashmap as it does not necessarily implements all the hashmap methods, at least for now, but it provides some sugar methods.

## Alternative

* (hashmap)[https://github.com/flesler/hashmap]
* (ds.js)[https://github.com/evonove/ds.js]

hashmap seems more maintained is more known than ds.js. If you only want an hashmap implementation you should use
hasmap. But if you want more `container` might help.

## API

### add(name, value)

### get(name)

### remove(name)

### last()

### range(name1, name2, options)

### invertedRange(name1, name2, options)

### at(index)

### isEmpty()

### iter(fn, ctx)

### iterDown(fn, ctx)

### loop(fn)

### loopDown(fn)

### loopDownUntil(fn, predicate)

## Contributing

Contributions are welcome. Simply fork and send a PR.

## License

MIT
