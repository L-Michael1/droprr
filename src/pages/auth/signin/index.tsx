import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { BsDiscord, BsGoogle } from "react-icons/bs";
import type { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { RiBearSmileLine } from "react-icons/ri";

// Pre-render and get providers for SignIn component
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/tracked-products" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

type Provider = {
  name: string;
  id: string;
  icon: ReactNode;
};

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const providerIcons: Array<ReactNode> = [
    <BsGoogle key={0} className="mr-2" />,
    <BsDiscord key={1} className="mr-2" />,
  ];

  const providersAndIcons: Array<Provider> = Object.values(providers).map(
    (provider, i) => ({
      name: provider.name,
      id: provider.id,
      icon: providerIcons[i],
    }),
  );

  return (
    <>
      <Head>
        <title>Sign in to droprr</title>
        <meta name="description" content="Amazon product price tracker" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center pb-24">
        {/* Heading */}
        <Link className="text-gray-300 duration-200" href="/">
          <div className="mb-2 inline-flex items-center gap-1 transition-all duration-300 hover:brightness-90">
            <RiBearSmileLine size={"2rem"} className="text-accent" />
            <h1 className="text-accent text-3xl font-semibold tracking-wider">
              droprr
            </h1>
          </div>
        </Link>

        {/* Form */}
        <section
          aria-label="Sign in form"
          className="flex flex-col justify-center rounded-lg border bg-[#F2F4F7] px-12 py-8 text-center shadow sm:px-16"
        >
          <span className="text-sm font-medium">Sign in with</span>

          {/* Providers */}
          <section>
            <div className="mt-6 grid gap-3">
              {providersAndIcons.map((provider) => (
                <div key={provider.name}>
                  <button
                    type="button"
                    className="bg-accent inline-flex w-36 items-center justify-center rounded-md  
                   px-6 py-3 text-lg font-medium text-white shadow-md duration-200 hover:brightness-90"
                    onClick={() => void signIn(provider.id)}
                  >
                    {provider.icon}
                    <span>{provider.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer>
            <p className="mt-6 max-w-[10rem] text-xs leading-5 sm:max-w-[12rem]">
              By signing in, you agree to our{" "}
              <a className="text-accent" href="/terms-of-service">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="text-accent" href="/privacy-policy">
                Privacy Policy
              </a>
            </p>
          </footer>
        </section>
      </div>
    </>
  );
}
