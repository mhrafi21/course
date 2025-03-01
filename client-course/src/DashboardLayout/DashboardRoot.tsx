import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { VscChromeClose, VscMenu } from "react-icons/vsc";
import { MdOutlineManageHistory } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import Dashboard from "../pages/DahboardPages/Dashboard/Dashboard";

const DashboardRoot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<number | null>(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleSubmenu = (index: number) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      path: "/dashboard",
    },
    {
      title: "Manage",
      icon: <MdOutlineManageHistory />,
      submenu: [
        { title: "Users", path: "/dashboard/manage/users" },
        { title: "Products", path: "/dashboard/manage/products" },
        { title: "Orders", path: "/dashboard/manage/orders" },
      ],
      path: null,
    },
    {
      title: "Manage",
      icon: <MdOutlineManageHistory />,
      submenu: [
        { title: "Users", path: "/dashboard/manage/users" },
        { title: "Products", path: "/dashboard/manage/products" },
        { title: "Orders", path: "/dashboard/manage/orders" },
      ],
      path: null,
    },
    {
      title: "Reports",
      icon: "📊",
      path: "/dashboard/reports",
    },
    {
      title: "Settings",
      icon: "🔧",
      path: "/dashboard/settings",
    },
    {
      title: "Settings",
      icon: "🔧",
      path: "/dashboard/settings",
    },

  ];

  return (
    <div className="flex h-screen">
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-30 h-full w-48 bg-gray-800 text-white transition-transform lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 lg:py-6">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <button className="text-xl lg:hidden ml-5" onClick={toggleSidebar}>
            <VscChromeClose />
          </button>
        </div>
        <nav className="mt-4 space-y-2">
          {menuItems?.map((item, index) => (
            <div key={index}>
              {item.path === null ? (
                <div>
                  <button
                    className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium hover:bg-gray-700"
                    onClick={() => item.submenu && toggleSubmenu(index)}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon} {item.title}
                    </span>
                    {item.submenu && (
                      <span>
                        {submenuOpen === index ? (
                          <FaAngleUp />
                        ) : (
                          <FaAngleDown />
                        )}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <NavLink to={`${item.path}`}>
                  <button
                    className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium hover:bg-gray-700"
                    onClick={() => item.submenu && toggleSubmenu(index)}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon} {item.title}
                    </span>
                    {item.submenu && (
                      <span>
                        {submenuOpen === index ? (
                          <FaAngleUp />
                        ) : (
                          <FaAngleDown />
                        )}
                      </span>
                    )}
                  </button>
                </NavLink>
              )}
              {item.submenu && (
                <div
                  className={`overflow-hidden transition-all ${
                    submenuOpen === index ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  {item.submenu.map((subitem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subitem.path}
                      className="block px-8 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      {subitem.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1">
        <button
          className="m-4 p-2 text-white bg-gray-800 rounded lg:hidden"
          onClick={toggleSidebar}
        >
          <VscMenu />
        </button>
        <div className="p-4">
          <Dashboard />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardRoot;
