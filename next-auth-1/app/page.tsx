// this is the main component which is server component
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import MainClient from "./main";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return <MainClient session={session} />;
}
