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
      <div className="fade-in flex min-h-screen flex-col items-center justify-center pb-24">
        {/* Heading */}
        <Link className="text-gray-300 duration-200" href="/">
          <h1 className="mb-2 text-3xl font-semibold transition-all duration-200 hover:text-blue-400">
            droprr
          </h1>
        </Link>

        {/* Form */}
        <section
          aria-label="Sign in form"
          className="flex flex-col justify-center rounded-lg border border-y border-zinc-700
        bg-zinc-800 px-12 py-8 text-center shadow sm:px-16"
        >
          <span className="text-sm font-medium text-zinc-400">
            Sign in with
          </span>

          {/* Providers */}
          <section>
            <div className="mt-6 grid gap-3">
              {providersAndIcons.map((provider) => (
                <div key={provider.name}>
                  <button
                    type="button"
                    className="inline-flex w-36 items-center justify-center rounded-md border border-zinc-700 
                  bg-zinc-800 px-6 py-3 text-lg font-medium text-white shadow-sm duration-200 hover:bg-zinc-700
                  hover:text-zinc-100"
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
              <a className="text-blue-400" href="/terms-of-service">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="text-blue-400" href="/privacy-policy">
                Privacy Policy
              </a>
            </p>
          </footer>
        </section>
      </div>
    </>
  );
}
