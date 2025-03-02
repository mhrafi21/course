import React, { useState } from "react";
import { NavLink } from "react-router";
import { Menu, ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { motion } from "framer-motion"; // Import Framer Motion
import UserDropdownMenu from "@/components/UserDropDownMenu/UserDropDownMenu";

const Navbar: React.FC = () => {
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center h-20">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-blue-600">
          CourseHub
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-zinc-100 rounded-lg p-2 text-black text-sm"
                : "text-gray-700 p-2 hover:text-blue-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive
                ? "bg-zinc-100 rounded-lg p-2 text-black text-sm"
                : "text-gray-700 p-2 hover:text-blue-600"
            }
          >
            Courses
          </NavLink>
          {/* Courses Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-700 hover:bg-zinc-100 p-2 rounded-lg">
              Categories <ChevronDown size={16} className="ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <NavLink to="/courses/web-development">Web Development</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/courses/data-science">Data Science</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/courses/design">UI/UX Design</NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-400 rounded-lg p-2 text-white"
                : "text-gray-700 rounded-lg hover:bg-zinc-100 p-2"
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-400 rounded-lg p-2 text-white"
                : "text-gray-700 rounded-lg hover:bg-zinc-100 p-2"
            }
          >
            About
          </NavLink>
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-400 rounded-lg p-2 text-white"
                : "text-gray-700 rounded-lg hover:bg-zinc-100 p-2"
            }
          >
            Contact
          </NavLink>

          {/* Shopping Cart */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              <div className="relative">
                <ShoppingCart className="text-gray-700 hover:text-blue-600" />
                <div className="absolute -top-2  -right-3 w-5 h-5 bg-red-500 rounded-full">
                  {" "}
                  <span className="text-white text-sm w-full h-full flex items-center justify-center">
                    9
                  </span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <div className="mb-4">
                  <div className="flex gap-3">
                    <img
                      src="https://via.placeholder.com/150"
                      alt=""
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-700">
                        Course Title
                      </h3>
                      <p className="text-xs font-medium text-gray-500">
                        By Author
                      </p>

                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            <NavLink to="/cart"  className="w-full">
              <Button  className="w-full">View cart</Button>
            </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
           {/* Login User DropdownMenu */}
           <NavLink to={"/login"}><Button>Login</Button></NavLink>
           <NavLink to={"/sign-up"}><Button>Sign Up</Button></NavLink>
            <div className=''>
            <UserDropdownMenu />
            </div>
        {/* Login User DropdownMenu */}
        </div>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger className="lg:hidden text-gray-700">
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col space-y-4 p-4">
              <NavLink
                to="/"
                className="block text-gray-700 hover:text-blue-600"
              >
                Home
              </NavLink>

              {/* Mobile Courses Dropdown with Smooth Animation */}
              <button
                className="w-full flex justify-between items-center text-gray-700 hover:text-blue-600 focus:outline-none"
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              >
                Courses{" "}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    mobileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: mobileDropdownOpen ? "auto" : 0,
                  opacity: mobileDropdownOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-col space-y-2 pl-4">
                  <NavLink
                    to="/courses/web-development"
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Web Development
                  </NavLink>
                  <NavLink
                    to="/courses/data-science"
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Data Science
                  </NavLink>
                  <NavLink
                    to="/courses/design"
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    UI/UX Design
                  </NavLink>
                </div>
              </motion.div>

              <NavLink
                to="/pricing"
                className="block text-gray-700 hover:text-blue-600"
              >
                Pricing
              </NavLink>
              <NavLink
                to="/about"
                className="block text-gray-700 hover:text-blue-600"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="block text-gray-700 hover:text-blue-600"
              >
                Contact
              </NavLink>

              {/* Search & Auth Buttons */}
              <Button variant="outline" className="w-full">
                Login
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
