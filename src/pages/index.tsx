import { useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Carousel from "~/components/Carousel";
import Layout from "~/components/Layout";

const Home = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>droprr</title>
        <meta name="description" content="Amazon product price tracker" />
        <link rel="icon" href="/assets/droprr.svg" />
      </Head>
      <Layout>
        <div className="px-6 py-24 md:px-20">
          <div className="flex gap-16 max-lg:flex-col-reverse">
            <Carousel />

            <div className="flex flex-col justify-center">
              <h1 className="mt-4 text-6xl font-bold leading-[72px] tracking-[-1.2px] ">
                hi, we&apos;re
                <span className="text-accent"> droprr</span>
              </h1>

              <p className="mt-6">
                Quit overpaying on Amazon – track any product and get notified
                for price drops.
              </p>

              <div className="mt-6">
                <Link href={session ? "/tracked-products" : "/auth/signin"}>
                  <button
                    disabled={isLoading}
                    onClick={() => setIsLoading(true)}
                    className={isLoading ? "cta-button-loading" : "cta-button"}
                  >
                    Start Tracking
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
