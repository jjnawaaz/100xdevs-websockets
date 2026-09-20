const map = new Set(["a", "b", "c"]);

console.log(map);
console.log(map);

// make an iterable
const iterable = map.values();

// values method()
console.log(iterable);
for (const entry of iterable) {
  console.log(entry);
}

// keys method()
const keys = map.keys();
console.log(keys);

for (const entry of keys) {
  console.log(entry);
}

// entries method()
const entries = map.entries(); // -------> [a,a],[b,b],[c,c] returns this
for (const entry of entries) {
  console.log(entry);
}

// forEach
map.forEach((e) => {
  console.log("In for each ");
  console.log(e);
});

// add
map.add("d");
console.log(map);

//delete
map.delete("a");
console.log(map);

// clear
