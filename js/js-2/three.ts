type User = {
  id: string;
  name: string;
  email: string;
};

function getProperty<T, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

const user: User = {
  name: "Alice",
  id: "12",
  email: "myemail@haha.com",
};

const getUserName = getProperty(user, "name");
const getUserId = getProperty(user, "id");

console.log(getUserName);
console.log(getUserId);
