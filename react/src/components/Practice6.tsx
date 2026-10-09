import { useEffect, useRef, useState } from "react";

export default function Practice6() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;
  // Set up an interval that logs count every second.
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(countRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
}
