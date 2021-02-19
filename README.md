# merge-left-utils
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: realtominoff](https://img.shields.io/twitter/follow/realtominoff.svg?style=social)](https://twitter.com/realtominoff)

> Merge objects without structure changes

Library provides functions for easy objects updates preserving their initial structure.

I've created this library to simplify work with react state and apollo data in forms, but it may be used in various scenarios when you want update object fields values, but not object structure itself.

**mergeLeftKeys (fields[], source, target) -> result**

Copy fields, existing in source, from target

```javascript
const a = { a: 'a', b: 'b' }
const b = { a: 'newA', b: 'newB' }

mergeLeftKeys(['b'], a, b) // -> { a: 'a', b: 'newB' }
```

**mergeLeft (source, target) -> result**

Function mergeLeft copies all fields, existing in source, from target. Fields that not present in source are ignored

It's shortcut for **mergeLeftKeys** - `(a, b) => mergeLeftKeys(Object.keys(a), a, b)`

```javascript
const a = { a: 'a', b: 'b' }
const b = { b: 'newB', c: 'newC' }

mergeLeft(a, b) // -> { a: 'a', b: 'newB' }
```

## Install

```sh
# with npm
npm install merge-left-utils
# with yarn
yarn add merge-left-utils
```

## Run tests

```sh
yarn run test
```

## Author

👤 **ikenfin**

* Website: https://ikfi.ru
* Twitter: [@realtominoff](https://twitter.com/realtominoff)
* Github: [@ikenfin](https://github.com/ikenfin)

## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_