import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userImage, setUserImage] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    // Fetch the current user's data by userId
    const fetchUserImage = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(`/api/users/${user.id}`);
          setUserImage(response.data.image);
        } catch (error) {
          console.error('Error fetching user image:', error);
        }
      }
    };

    fetchUserImage();
  }, [user?.id]);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside of the menu
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[--primary-color] text-xl font-semibold flex    justify-between items-center p-4 px-7">
      <div>
        <Link to="/">
          <img src="./white-logo.svg" alt="logo" className="object-cover w-16 cursor-pointer" />
        </Link>
      </div>

      {/* Main Navigation Links */}
      <div className="  hidden sm:flex md:hidden ">
        <ul className="list-none  hidden sm:flex  gap-2 text-[--text-color]">
          <li><a href="#Home" className="scroll-smooth">Home</a></li>
          <li><a href="#Features" className="scroll-smooth">Features</a></li>
          <li><a href="#About" className="transition delay-1000 duration-300 scroll-smooth">About</a></li>
        </ul>
      </div>

      {/* User Menu */}
      {user ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={handleMenuToggle}
            className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 focus:outline-none"
          >
            <img
              src={userImage || './default-avatar.png'} // Ensure fallback works
              alt="User Avatar"
              className="object-cover sm:w-full sm:h-full w-fit h-fit "
              onError={(e) => {
                console.error('Image load error:', e);
                console.error('Image URL:', e.target.src); // Log the URL that failed
              }}
            />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute -right-2.5 mt-1 bg-[--primary-color] shadow-lg rounded-lg w-48 z-10">
              <ul className="list-none p-2  ">
                <li>
                  <Link to="/profile" className="block px-4 py-2 text-[--text-color] hover:text-gray-400 ">
                    Profile
                  </Link>
                </li>
                {user.isAdmin && (
                  <li>
                    <Link to="/dashboard" className="block px-4 py-2 text-[--text-color] hover:text-gray-400">
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/formation" className="block px-4 py-2 text-[--text-color] hover:text-gray-400">
                    Courses
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 w-full text-[--text-color] hover:text-gray-400 text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="text-decoration-none">
          <button className="py-1 px-3 rounded-md bg-[--button-color] text-[--text-color] text-md font-medium lg:block sm:hidden">
            Login
          </button>
        </Link>
      )}
    </header>
  );
}

export default Navbar;
