import { useEffect, useState } from "react";

export default function Practice7({ userId }: { userId: number }) {
  const [user, setUser] = useState();
  useEffect(() => {
    let isAllowed = true;
    async function loadUser() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      if (isAllowed) {
        setUser(data);
      }
    }

    loadUser();

    return () => {
      isAllowed = false;
    };
  }, [userId]);
  return (
    <>
      <div>Hello</div>
    </>
  );
}
