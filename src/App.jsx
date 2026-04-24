import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Employee from './pages/Employee';
import Department from './pages/Department';
import Salary from './pages/Salary';
import Reports from './pages/Reports';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          <Route 
            path="/login" 
            element={
              <Login setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          <Route 
            path="/employees" 
            element={
              isAuthenticated ? <Employee /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/departments" 
            element={
              isAuthenticated ? <Department /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/salary" 
            element={
              isAuthenticated ? <Salary /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/reports" 
            element={
              isAuthenticated ? <Reports /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;