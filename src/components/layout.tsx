import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="max-w-8xl">
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
