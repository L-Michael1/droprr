import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="max-w-8xl mx-auto">
      <Navbar />
      {children}
      {/* <Footer /> */}
    </main>
  );
};

export default Layout;