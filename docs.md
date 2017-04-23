# How it works

[Create a gist][github-gist], and add your test files to it. In this example, we'll write a performance test between the native `Array.prototype.forEach`, and a custom implementation. You can view this example gist [here][example-gist].

## Tests

**test-native.js**

```javascript
myArr.forEach(function (item) {
  return null
})
```

**test-custom.js**

```javascript
customForEach(myArr, function (item) {
  return null
})
```

## Setup (optional)

Since `myArr` and `customForEach` aren't defined, and we don't want to define them every time a test runs, we'll define them in the setup file.

**setup.js**

```javascript
function customForEach (arr, iterator) {
  var index

  for (index = 0; index < arr.length; index++) {
    iterator(arr[index])
  }
}

var myArr = [1, 2, 3, 4, 5]
```

## Config (optional)

If you want to customize the settings of the test runner, add a config file.

**config.json**

```json
{
  "iterations": 100
}
```

### iterations

Number of times each test will be run

Type: `number`

Default: `10000`

[example-gist]: https://gist.github.com/chrisdothtml/8877d7dd834f4923f2b689d034046d55
[github-gist]: https://gist.github.com
