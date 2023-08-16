import React from 'react';
import Link from '@mui/material/Link';
import routes from '../routes';

const Navigation: React.FC = () => {
  return (
    <nav className="p-4 shadow-md sticky top-0 w-full z-50">
      <ul className="flex space-x-4">
        {routes.map((route, index) => (
          <li key={index} className="hover:bg-blue-500 rounded px-3 py-1">
            <Link href={route.path} className="text-white no-underline hover:underline">
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;