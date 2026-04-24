import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">
            EPMS - SmartPark
          </div>
          
          <div className="flex space-x-6">
            <Link to="/employees" className="hover:text-blue-200 transition">
              Employee
            </Link>
            <Link to="/departments" className="hover:text-blue-200 transition">
              Department
            </Link>
            <Link to="/salary" className="hover:text-blue-200 transition">
              Salary
            </Link>
            <Link to="/reports" className="hover:text-blue-200 transition">
              Reports
            </Link>
            <button onClick={handleLogout} className="hover:text-blue-200 transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;