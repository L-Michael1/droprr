import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const walsheim = localFont({
  src: "./GTWalsheimProRegular.woff2",
  variable: "--font-walsheim",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <main className={`${walsheim.variable} font-sans`}>
      <SessionProvider session={session}>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
