import React from "react";
import { NavLink, Outlet } from "react-router";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Header, { menuItems } from "@/pages/DahboardPages/components/Header/Header";


const DashboardRoot: React.FC = () => {
  return (
    <div className="flex h-screen flex-col">
      {/* Top Navbar */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:flex w-64 border-r-2 shadow-lg flex-col p-4 bg-gray-100 dark:bg-gray-800">
          <nav className="space-y-2">
            {menuItems?.map((item, index) =>
              item.submenu ? (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem value={item.title}>
                    <AccordionTrigger className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.submenu.map((subitem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subitem.path}
                          className="block px-8 py-2 text-sm hover:bg-gray-700"
                        >
                          {subitem.title}
                        </NavLink>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <NavLink
                  key={index}
                  to={item.path}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-gray-700"
                >
                  {item.icon} {item.title}
                </NavLink>
              )
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardRoot;
