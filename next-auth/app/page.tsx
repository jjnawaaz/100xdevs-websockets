import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { HomeClient } from "./HomePage";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <HomeClient session={session} />
    </div>
  );
}
