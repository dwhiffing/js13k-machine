export const between = (min, max) => Math.floor(Math.random() * max) + min

export const nearest = (value, precision) =>
  Math.floor(value / precision) * precision

export const setKey = (key, value, targetObject) => {
  var keys = key.split('.'),
    obj = targetObject || window,
    keyPart
  while ((keyPart = keys.shift()) && keys.length) {
    obj = obj[keyPart]
  }
  obj[keyPart] = value
}
