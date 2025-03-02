import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router";

const RootLayout: React.FC = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <ScrollRestoration />
      <main  className="pt-20">
        {/* Render the children components */}
        <Outlet />
        <Toaster />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
