import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>droprr</title>
        <meta name="description" content="Amazon product price tracker" />
        <link rel="icon" href="/assets/favicon.svg" />
      </Head>
      <main>droprr</main>
    </>
  );
};

export default Home;
