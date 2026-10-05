// factorial of a number

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function memoize(func) {
  let cache = {
    0: 1,
  };

  return function (n) {
    if (cache.hasOwnProperty(n)) {
      console.log("From cache");
      return cache[n];
    }
    let result = 0;
    // loop everything and calculate factorial
    for (let i = 1; i <= n; i++) {
      cache[i] = i * cache[i - 1];
      result = cache[i];
    }

    return result;
  };
}

const memoizeFactorial = memoize(factorial);
console.log(memoizeFactorial(5));
console.log(memoizeFactorial(5));
console.log(memoizeFactorial(4));
console.log(memoizeFactorial(2));
console.log(memoizeFactorial(5));
