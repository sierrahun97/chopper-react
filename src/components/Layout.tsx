import { Outlet } from "react-router-dom";
import { CartModal } from "./CartModal";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Separator } from "./Separator";

export function Layout() {
  return (
    <>
      <Navbar />
      <Separator className="separator-nav" />
      <Outlet />
      <Separator className="separator-footer" />
      <Footer />
      <CartModal />
    </>
  );
}
