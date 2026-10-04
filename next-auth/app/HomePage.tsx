"use client";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export function HomeClient({ session }) {
  return (
    <SessionProvider session={session}>
      <OGHome />
    </SessionProvider>
  );
}

function OGHome() {
  const session_data = useSession();
  console.log(session_data);
  return (
    <div>
      {session_data.status === "authenticated" ? (
        <>
          <div>HI user {session_data.data.user?.name}</div>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
          <div>HI user SignIn</div>
          <button onClick={() => signIn()}>SignIn</button>
        </>
      )}
    </div>
  );
}
