// reverse a string

function reverseString(str) {
  console.log("Calculaitng expensive operation");
  return str.split("").reverse().join("");
}

function memoize(func) {
  let cache = {};

  return function (args) {
    if (cache.hasOwnProperty(args)) {
      console.log("Returning from the cache");
      return cache[args];
    }

    // rsukt
    const result = func(args);
    cache[args] = result;
    return result;
  };
}

const reverse = memoize(reverseString);

console.log(reverse("hello")); // Reversing... olleh
console.log(reverse("hello")); // From cache... olleh
console.log(reverse("world")); // Reversing... dlrow
console.log(reverse("world")); // From cache... dlrow
