// memoize results

function expensiveOperation(n) {
  console.log("Calculating expensive operation.......");
  return n * n;
}

function memoize(func) {
  let cache = {};

  return function (n) {
    if (cache.hasOwnProperty(n)) {
      console.log("Returning from cache.....");
      return cache[n];
    }
    const result = func(n);
    cache[n] = result;
    return cache[n];
  };
}

const expensive = memoize(expensiveOperation);

console.log(expensive(2));
console.log(expensive(2));
console.log(expensive(3));
console.log(expensive(3));
console.log(expensive(4));
