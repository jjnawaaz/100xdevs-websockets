import { useState } from "react";

export const Practice1 = () => {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <p>{count}</p>
    </div>
  );
};
