function add(a, b) {
  console.log("Calculating expensive operation.....");
  return a + b;
}

function memoize(func) {
  let cache = {};

  return function (arg1, arg2) {
    const cacheVariable = `${arg1},${arg2}`;
    if (cache.hasOwnProperty(cacheVariable)) {
      console.log("Returning from cache here ");
      return cache[cacheVariable];
    }
    const result = func(arg1, arg2);
    cache[cacheVariable] = result;
    console.log(cache);
    return result;
  };
}

const memoizedAdd = memoize(add);

console.log(memoizedAdd(2, 3));
// Calculating...
// 5

console.log(memoizedAdd(2, 3));
// Returning from cache...
// 5

console.log(memoizedAdd(5, 10));
// Calculating...
// 15

console.log(memoizedAdd(5, 10));
// Returning from cache...
// 15
