import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";
import Searchbar from "~/components/Searchbar";

const Home = () => {
  return (
    <>
      <Head>
        <title>droprr</title>
        <meta name="description" content="Amazon product price tracker" />
        <link rel="icon" href="/assets/favicon.svg" />
      </Head>
      <main className=" px-6 py-24 md:px-20">
        <div className="flex gap-16 max-xl:flex-col">
          <div className="flex flex-col justify-center">
            <p className="text-primary flex items-center gap-2 text-sm font-medium">
              Never Miss a Deal:
              <AiOutlineArrowRight />
            </p>

            <h1 className="mt-4 text-6xl font-bold leading-[72px] tracking-[-1.2px] text-gray-900">
              Shop Smarter, Not Harder - With
              <span className="text-primary"> droprr</span>
            </h1>

            <p className="mt-6">
              Quit overpaying on Amazon – track your recurring purchases.
            </p>

            <div className="mt-6">
              <button className="cta-button">Start Tracking</button>
            </div>

            <div>
              <Searchbar />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
