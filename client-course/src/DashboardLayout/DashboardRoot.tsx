import React from "react";
import { NavLink, Outlet } from "react-router";
import { VscChromeClose, VscMenu } from "react-icons/vsc";
import { MdOutlineManageHistory, MdDashboard } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ThemeProvider/ModeToggle";

const menuItems = [
  { title: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
  {
    title: "Manage",
    icon: <MdOutlineManageHistory />,
    submenu: [
      { title: "Users", path: "/dashboard/manage/users" },
      { title: "Courses", path: "/dashboard/manage/products" },
      { title: "Enrolment", path: "/dashboard/manage/orders" },
    ],
  },
  { title: "Reports", icon: "📊", path: "/dashboard/reports" },
  { title: "Settings", icon: "🔧", path: "/dashboard/settings" },
];

const DashboardRoot: React.FC = () => {
  return (
    <div className="flex h-screen flex-col">
      {/* Top Navbar */}
      <header className="p-4 flex justify-between items-center shadow-md bg-white dark:bg-gray-900 sticky top-0 z-50 w-full">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="lg:hidden p-2 bg-gray-800 text-white rounded">
                <VscMenu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-gray-900 text-white p-4">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Dashboard</h1>
                <SheetTrigger asChild>
                  <Button >
                      close
                  </Button>
                </SheetTrigger>
              </div>
              <nav className="mt-4 space-y-2">
                {menuItems.map((item, index) => (
                  item.submenu ? (
                    <Accordion key={index} type="single" collapsible>
                      <AccordionItem value={item.title}>
                        <AccordionTrigger className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
                          {item.icon} {item.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.submenu.map((subitem, subIndex) => (
                            <NavLink key={subIndex} to={subitem.path} className="block px-8 py-2 text-sm hover:bg-gray-700">
                              {subitem.title}
                            </NavLink>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <NavLink key={index} to={item.path} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700">
                      {item.icon} {item.title}
                    </NavLink>
                  )
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold hidden lg:block">Admin Dashboard</h1>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center w-full max-w-md">
          <Input placeholder="Search..." className="w-full" />
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-4">
          <IoMdNotificationsOutline className="text-2xl cursor-pointer" />
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://via.placeholder.com/40" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Messages</DropdownMenuItem>
              <DropdownMenuItem>Language</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500"><FiLogOut />Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:flex w-64 border-r-2 shadow-lg flex-col p-4 bg-gray-100 dark:bg-gray-800">
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              item.submenu ? (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem value={item.title}>
                    <AccordionTrigger className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.submenu.map((subitem, subIndex) => (
                        <NavLink key={subIndex} to={subitem.path} className="block px-8 py-2 text-sm hover:bg-gray-700">
                          {subitem.title}
                        </NavLink>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <NavLink key={index} to={item.path} className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-gray-700">
                  {item.icon} {item.title}
                </NavLink>
              )
            ))}
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