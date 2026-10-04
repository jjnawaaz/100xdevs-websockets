"use client";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

const MainClient = ({ session }) => {
  return (
    <SessionProvider session={session}>
      <OGHome />
    </SessionProvider>
  );
};

function OGHome() {
  const sessionData = useSession();
  return (
    <>
      <div>
        {/* display content dynamically here  */}
        {sessionData.status === "authenticated" ? (
          <>
            <h1>Hi user {sessionData.data.user?.email}</h1>
            <br />
            <button onClick={() => signOut()}>Logout</button>
          </>
        ) : (
          <>
            <h1>Hi new user wanna sign in ?</h1>
            <button onClick={() => signIn()}>SignIn</button>
          </>
        )}
      </div>
    </>
  );
}

export default MainClient;
