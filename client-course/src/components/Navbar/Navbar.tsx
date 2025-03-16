import React, { useState } from "react";
import { NavLink } from "react-router";
import { Menu, ChevronDown, ShoppingCart, SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import UserDropdownMenu from "@/components/UserDropDownMenu/UserDropDownMenu";
import { useAuth } from "@/hooks/useAuth";
import { ModeToggle } from "../ThemeProvider/ModeToggle";
import { Card } from "../ui/card";
import Search from "../Search/Search";
import {motion} from "framer-motion"
const Navbar: React.FunctionComponent = () => {
  const { isAuthenticated, user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);


  return (
    <Card className="rounded-none border-none fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 transition-colors">
      <nav>
        <div className="container mx-auto flex items-center h-20">
          {/* Logo */}
          <NavLink to="/" className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            CourseHub
          </NavLink>

          {/* Desktop Navigation */}
          <div className="w-full hidden lg:block px-5">
            <Search />
          </div>

          {/* Mobile Search Toggle Button */}
          <div className="lg:hidden ml-auto mr-3">
            <span className="bg-transparent" onClick={() => setSearchOpen(true)}>
              <SearchIcon size={24} />
            </span>
          </div>

          <div className="mr-3 block lg:hidden">
          <ModeToggle />
          </div>

          {/* Mobile Search Bar */}
          <div 
          className={`fixed top-0 left-0 right-0 z-50 ${searchOpen ? 'block' : 'hidden'}`}>
            <div className="w-full bg-white h-screen dark:bg-gray-900">
              <div className="flex justify-between p-4">
                <motion.div
                   initial={{ opacity: 0, y: -100 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.3 }}
                className="w-full">
                  <Search />
                </motion.div>
                <span className="p-2" onClick={() => setSearchOpen(false)}>
                  <X size={24} />
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex ml-auto items-center space-x-2">
            <NavLink to="/" className="text-gray-700 dark:text-gray-300 p-2 hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </NavLink>
            <NavLink to="/courses" className="text-gray-700 dark:text-gray-300 p-2 hover:text-blue-600 dark:hover:text-blue-400">
              Courses
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
                Categories <ChevronDown size={16} className="ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="dark:bg-gray-800 dark:text-white">
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

            {/* Shopping Cart */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <div className="relative">
                  <ShoppingCart className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
                  <div className="absolute -top-2 -right-3 w-5 h-5 bg-red-500 rounded-full">
                    <span className="text-white text-sm w-full h-full flex items-center justify-center">
                      9
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:text-white">
                <DropdownMenuItem>
                  <div className="mb-4">
                    <div className="flex gap-3">
                      <img
                        src="https://via.placeholder.com/150"
                        alt=""
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Course Title
                        </h3>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          By Author
                        </p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
                <NavLink to="/cart" className="w-full">
                  <Button className="w-full">View cart</Button>
                </NavLink>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <ModeToggle />

            <div>
              {isAuthenticated && user   ? (
                <UserDropdownMenu user={user} />
              ) : (
                <NavLink to="/login">
                  <Button>Login</Button>
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
            </SheetTrigger>
            <SheetTrigger className="lg:hidden text-gray-700 dark:text-gray-300">
              <Menu size={24} />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 dark:bg-gray-900 dark:text-white">
              <div className="flex flex-col space-y-4 p-4">
                <NavLink to="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </NavLink>

                {/* Mobile Courses Accordion */}
                <Accordion type="single"  collapsible>
                  <AccordionItem value="courses" className="border-none">
                    <AccordionTrigger className="w-full flex justify-between items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      Courses
                    
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-2 pl-3 border-l-2">
                      <NavLink to="/courses/web-development">Web Development</NavLink>
                      <NavLink to="/courses/data-science">Data Science</NavLink>
                      <NavLink to="/courses/design">UI/UX Design</NavLink>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

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
    </Card>
  );
};

export default Navbar;
