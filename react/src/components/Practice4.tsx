import { useState } from "react";

export default function StateUpdates() {
  const [count, setCount] = useState(0);

  function incrementOnce() {
    // Your code
    setCount((prev) => prev + 1);
  }

  function incrementThreeTimes() {
    // Your code
    setCount((prev) => prev + 3);
  }

  function reset() {
    // Your code
    setCount(0);
  }

  return (
    <div>
      <h1>Count: {count}</h1>

      <button onClick={incrementOnce}>Increment once</button>

      <button onClick={incrementThreeTimes}>Increment three times</button>

      <button onClick={reset}>Reset</button>
    </div>
  );
}
