// multiply
function multiply(a, b) {
  console.log("Expensive calculation......");
  return a * b;
}

function memoize(func) {
  let cache = {};

  return function (a, b) {
    let cachedVariable = `${a},${b}`;
    if (cache.hasOwnProperty(cachedVariable)) {
      console.log("From cache");
      return cache[cachedVariable];
    }

    let result = func(a, b);
    cache[cachedVariable] = result;

    return result;
  };
}

const memoizedMul = memoize(multiply);

console.log(memoizedMul(2, 5));
console.log(memoizedMul(2, 5));
console.log(memoizedMul(5, 2));
console.log(memoizedMul(5, 2));
