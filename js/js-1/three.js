function DeepEqual(obj1, obj2) {
  let isChecked = true;
  // check if both are objects first
  if ((!obj1) instanceof Object || (!obj2) instanceof Object) {
    return false;
  }
  // check if they have same matching keys and values
  Object.keys(obj1).forEach((key) => {
    if (obj2[key] === undefined || obj1[key] !== obj2[key]) {
      console.log("hittin");
      isChecked = false;
    }
  });
  if (isChecked) {
    return true;
  } else {
    return false;
  }
}

const result = DeepEqual(
  { name: "junaiD", age: 29 },
  { name: "junaid", age: 29 },
);
console.log(result);
