# merge-left-utils
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: realtominoff](https://img.shields.io/twitter/follow/realtominoff.svg?style=social)](https://twitter.com/realtominoff)

> Merge objects without structural changes

Library provides bunch of functions to simplify objects updates, preserving their initial structure.

I've created this library to simplify work with react state and apollo data in forms, but it may be used in various scenarios when you want update object fields values, but not object structure itself.

**mergeLeftKeys<T> (fields: string[], source: T, target: T, replaceDecision: Function) -> result: T**

Copy fields, existing in source, from target. **replaceDecision** is user level function to make decision about replacing key.

**Arguments:**

* fields: array of strings - which fields are being remain in result
* source: js object with source data
* target: js object with target data
* replaceDecision: boolean function of 3 - **(key: string, source, target) => boolean** - if returns true - field from {source} will be replaced with **target[key]**, else field replacing skips

```javascript
const a = { a: 'a', b: 'b' }
const b = { a: 'newA', b: 'newB' }

// simple case: operate only with {b} key
mergeLeftKeys(['b'], a, b) // -> { b: 'newB' }

// custom replace logic: do not replace {b} key
// signature: (key: string, source: T, target: Partial<T>) => boolean
mergeLeftKeys(['a', 'b'], a, b, (key) => key !== 'b')
```

**mergeLeft<T> (source: T, target: T) -> result: T**

Simple binary function - copies all fields from target which exists in source. Fields that not present in source are ignored

It's shortcut for **mergeLeftKeys** - `(a, b) => mergeLeftKeys(Object.keys(a), a, b)`

```javascript
const a = { a: 'a', b: 'b' }
const b = { b: 'newB', c: 'newC' }

// preserve [a.a], replace [a.b] with [b.b], skip [b.c]
mergeLeft(a, b) // -> { a: 'a', b: 'newB' }
```

**mergeLeftDropping<T> (dropKeys: string[], source: T, target: T) -> result: T**

Acts as mergeLeft but dropping keys from **dropKeys** argument.

```javascript
const a = { a: 'a', b: 'b' }
const b = { a: 'newA', b: 'newB' }

// replace [a.a] with [b.a], drop [b] field from result
mergeLeftDropping(['b'], a, b) // -> { a: 'newA' }
```



**mergeLeftExcept<T> (skippingKeys: string[], source: T, target: T) -> result: T**

Acts as mergeLeft but skip keys from **skipKeys** from being replaced

```javascript
const a = { a: 'a', b: 'b' }
const b = { a: 'newA', b: 'newB' }

// replace [a.b] with [b.b], skipping replace [a.a]
mergeLeftExcept(['a'], a, b) // -> { a: 'a', b: 'newB' }
```



##Install

```sh
# with npm
npm install merge-left-utils
# with yarn
yarn add merge-left-utils
```

## Examples

Visit [examples readme](https://github.com/ikenfin/merge-left-utils/blob/master/examples/README.md) to see use case examples

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
