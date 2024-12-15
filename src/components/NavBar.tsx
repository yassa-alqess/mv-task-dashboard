import React from 'react';
import {Link} from "react-router-dom"
const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-start">
          <Link to="/login" className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
