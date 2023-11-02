import Head from "next/head";
import Navbar from "./Navbar";

interface iLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: iLayoutProps) => {
  return (
    <>
      {/* Default metadata */}
      <Head>
        <title>droprr</title>
        <meta name="description" content="Amazon product price tracker" />
        <link rel="icon" href="/assets/droprr.svg" />
      </Head>
      <main className="mx-auto max-w-8xl">
        <Navbar />
        {children}
      </main>
    </>
  );
};

export default Layout;
