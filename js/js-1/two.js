// promise all
async function getDrivers() {
  return await fetch("https://f1connectapi.vercel.app/api/drivers", {
    method: "GET",
  });
}
async function getTeams() {
  return await fetch("https://f1connectapi.vercel.app/api/teams", {
    method: "GET",
  });
}
async function getCircuits() {
  return await fetch("https://f1connectapi.vercel.app/api/circuits", {
    method: "GET",
  });
}
const [responseDrivers, responseTeams, responseCircuits] =
  await Promise.allSettled([getDrivers(), getTeams(), getCircuits()]);

const [drivers, teams, circuits] = await Promise.allSettled([
  responseDrivers.value.json(),
  responseTeams.value.json(),
  responseCircuits.value.json(),
]);

console.log("Drivers are: ", drivers);
console.log(
  "--------------------------------------------------------------------------------------------------------------------------------------------",
);
console.log("Teams are: ", teams);
console.log(
  "--------------------------------------------------------------------------------------------------------------------------------------------",
);

console.log("Circuits are: ", circuits);
