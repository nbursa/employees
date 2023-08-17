import React, { useState } from "react";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import routes from "../routes";

const Navigation: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="relative">
      <nav className="p-4 shadow-md sticky top-0 w-full z-50 bg-gray-900 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="hidden md:flex space-x-4">
              {routes.map((route, index) => (
                <li key={index} className="text-white px-3 py-1 list-none">
                  <Link
                    sx={{
                      color: "#fafafa",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    href={route.path}
                    className="text-white no-underline hover:underline"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </div>
          </div>
          <IconButton
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            color="inherit"
            className="md:!hidden"
          >
            {mobileNavOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        {mobileNavOpen && (
          <div className="md:hidden absolute top-full right-0 mt-1 w-auto bg-gray-900 rounded-lg shadow-lg">
            <ul className="flex flex-col space-y-2 py-8 px-6 text-right">
              {routes.map((route, index) => (
                <li key={index}>
                  <Link
                    sx={{
                      color: "#fafafa",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    href={route.path}
                    className="block text-white no-underline hover:underline uppercase"
                    onClick={() => setMobileNavOpen(false)} // Close the navigation after link click
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
