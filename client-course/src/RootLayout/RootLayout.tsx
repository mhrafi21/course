import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router";

const RootLayout: React.FC = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main  className="pt-20">
        {/* Render the children components */}
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default RootLayout;
