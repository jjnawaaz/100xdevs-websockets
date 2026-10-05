function factorial(n) {
  if (n === 0 || n === 1) {
    console.log("Calculating expensive factorial");
    return 1;
  }

  return n * factorial(n - 1);
}

function memoize(func) {
  let cache = {};

  return function (n) {
    if (cache.hasOwnProperty(n)) {
      console.log("Getting it from cache");
      return cache[n];
    }
    let result = 0;
    // loop here for the factorial cache for each n
    for (let i = n; i >= 0; i--) {
      result = func(i);
      cache[i] = result;
    }
    console.log(result);
    console.log(cache);
    return result;
  };
}

const memoizedFactorial = memoize(factorial);
console.log(memoizedFactorial(5));
console.log(memoizedFactorial(5));
console.log(memoizedFactorial(4));
console.log(memoizedFactorial(3));
console.log(memoizedFactorial(2));
console.log(memoizedFactorial(1));
console.log(memoizedFactorial(0));
