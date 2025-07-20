import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          موقعنا الإلكتروني
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            الرئيسية
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/requests" className="nav-link">
                إدارة الطلبات
              </Link>
              <div className="user-info">
                <span>مرحباً، {user?.username}</span>
                <button onClick={handleLogout} className="logout-btn">
                  تسجيل الخروج
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              تسجيل الدخول
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 