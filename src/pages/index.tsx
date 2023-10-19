import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineArrowRight } from "react-icons/ai";
import Carousel from "~/components/Carousel";
import Layout from "~/components/Layout";

const Home = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>droprr</title>
        <meta name="description" content="Amazon product price tracker" />
        <link rel="icon" href="/assets/droprr.svg" />
      </Head>
      <Layout>
        <main className=" px-6 py-24 md:px-20">
          <div className="flex gap-16 max-lg:flex-col-reverse">
            <Carousel />

            <div className="flex flex-col justify-center">
              <p className="flex items-center gap-2 text-sm font-medium text-primary">
                Never Miss a Deal:
                <AiOutlineArrowRight />
              </p>

              <h1 className="mt-4 text-6xl font-bold leading-[72px] tracking-[-1.2px] text-gray-900">
                Shop Smarter, Not Harder - With
                <span className="text-primary"> droprr</span>
              </h1>

              <p className="mt-6">
                Quit overpaying on Amazon – track any product and get notified
                for price drops.
              </p>

              <div className="mt-6">
                <Link href="/tracked-products">
                  <button className="cta-button">Start Tracking</button>
                </Link>
              </div>
              <div>
                <button onClick={() => void signOut()}>sign out</button>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
