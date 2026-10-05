// merging data structures

// merging objects
const obj1 = {
  a: 1,
  b: 2,
};

const obj2 = {
  b: 3,
  c: 4,
};

const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj);

const mergedObj1 = { ...obj2, ...obj1 };
console.log(mergedObj1);

// merging arrays using spread [...]
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const mergedArr = [...array1, ...array2];
console.log(mergedArr);

// using concat
const mergedArr1 = array1.concat(array2);
console.log(mergedArr1);
