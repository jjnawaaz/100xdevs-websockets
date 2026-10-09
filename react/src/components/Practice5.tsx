import { useEffect, useState } from "react";

export default function Practice5() {
  const [seconds, setSeconds] = useState(0);

  // Implement the effect here

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // clearInterval
    return () => clearInterval(interval);
  }, []);

  return <h1>Elapsed: {seconds}s</h1>;
}
