import React from "react";
import { NavLink } from "react-router";
import { VscMenu } from "react-icons/vsc";
import { MdOutlineManageHistory, MdDashboard } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; // Helper for conditional styling (optional)
import { ModeToggle } from "@/components/ThemeProvider/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const menuItems = [
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

const notifications = [
  { id: 1, message: "New user registered", time: "2 min ago", unread: true },
  { id: 2, message: "New order placed", time: "10 min ago", unread: true },
  { id: 3, message: "Server maintenance scheduled", time: "1 hour ago", unread: false },
  { id: 4, message: "Your subscription is about to expire", time: "3 hours ago", unread: false },
];

const Header: React.FC = () => {
  return (
    <div>
      <header className="p-4 flex justify-between items-center shadow-md bg-white dark:bg-gray-900 sticky top-0 z-50 w-full">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="lg:hidden p-2 bg-gray-800 text-white rounded">
                <VscMenu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 bg-gray-900 text-white p-4"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Dashboard</h1>
                <SheetTrigger asChild>
                  <Button>close</Button>
                </SheetTrigger>
              </div>
              <nav className="mt-4 space-y-2">
                {menuItems.map((item, index) =>
                  item.submenu ? (
                    <Accordion key={index} type="single" collapsible>
                      <AccordionItem value={item.title}>
                        <AccordionTrigger className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
                          {item.icon} {item.title}
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
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      {item.icon} {item.title}
                    </NavLink>
                  )
                )}
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
           {/* Notification Dropdown */}
   {/* Notification Dropdown */}
   <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
            <IoMdNotificationsOutline className="text-2xl text-gray-700 dark:text-gray-300" />
            {notifications.some((n) => n.unread) && (
              <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full animate-pulse"></span>
            )}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-80 p-3 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Notifications</span>
            <span className="text-xs text-blue-500 cursor-pointer hover:underline">Mark all as read</span>
          </div>

          {/* Scrollable Notification List */}
          <div className="max-h-60 overflow-y-auto mt-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                >
                  <p className={cn("text-sm", notification.unread ? "font-semibold text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-400")}>
                    {notification.message.slice(0,20)+"..."}
                  </p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </DropdownMenuItem>
              ))
            ) : (
              <p className="p-4 text-center text-sm text-gray-500">No new notifications</p>
            )}
          </div>

          {/* View All Button */}
          <DropdownMenuItem className="mt-2 text-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
            See all notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      {/* Other right section content */}

      {/* Other right section content */}
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
              <DropdownMenuItem className="text-red-500">
                <FiLogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Header;
