import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = ({ openLoginDialog }) => {
  const { authUser, isLoading, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  if (isLoading) {
    return <nav className="header-nav">Loading...</nav>;
  }

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); 
      setDropdownOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className="header-nav">
      <h1>traXpensive</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {/* <li><Link to="/contact">Contact</Link></li> */}
        <li>
          {authUser ? (
            <div className="user-dropdown">
              <span onClick={handleDropdownToggle} className="user-email">
                {authUser.email}
              </span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleSignOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={openLoginDialog}>Login / Register</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;






