import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileCallButton from "./MobileCallButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileCallButton />
    </div>
  );
};

export default Layout;
