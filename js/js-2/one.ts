function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

console.log(getLength("hello"));
console.log(getLength({ length: 10 }));
console.log(getLength([1, 2, 3]));
// console.log(getLength(123));
