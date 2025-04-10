 
import React, { useEffect, useState } from 'react';
import {
  FaShoppingCart,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUserShield,
} from 'react-icons/fa';

 function Nav(){

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token'); // You might store auth tokens this way

    if (userData && token) {
      setUser(JSON.parse(userData)); // assuming it's stored as a JSON string
    } else {
      setUser(null); // not logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/signin'; // Redirect to login page
  };
    return(
        <div>
        {/* Navigation */}
 <nav className=" fixed w-full bg-green-600 text-white p-4">
 <div className="max-w-7xl mx-auto flex justify-between items-center">
 <a href="/">
 <h1 className="text-3xl font-bold">Online Market</h1>
 </a>
   <div className="space-x-4 flex items-center">
     <a href="/" className="hover:text-black-200 cursor-pointer p-2 mb-2 hover:bg-green-300 rounded-md" >Home</a>
     {/* <a href="/admin" className="hover:text-black-200 cursor-pointer p-2 mb-2 hover:bg-green-300 rounded-md">Admin Panel</a> */}
     <a href="/cart" className="hover:text-black-200 cursor-pointer p-2 mb-2 hover:bg-green-300 rounded-md"><FaShoppingCart className="inline-block mr-2" />Cart</a>
     {/* <a href="/logout" className="hover:text-black-200 cursor-pointer p-2 mb-2 hover:bg-green-300 rounded-md">Logout</a> */}
   
     {user ? (
              <>
                {user.role === 'admin' && (
                  <a
                    href="/admin"
                    className="hover:text-black-200 cursor-pointer p-2 mb-2 hover:bg-green-300 rounded-md"
                  >
                    <FaUserShield className="inline-block mr-2" />
                    Admin Panel
                  </a>
                )}

                <span className="px-2 font-semibold">Hello, {user.name}!</span>

                <button
                  onClick={handleLogout}
                  className="hover:text-black-200 cursor-pointer p-2 mb-2 hover:bg-green-300 rounded-md"
                >
                  <FaSignOutAlt className="inline-block mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/signin"
                  className="hover:text-black-200 cursor-pointer p-2 mb-2 hover:bg-green-300 rounded-md"
                >
                  <FaSignInAlt className="inline-block mr-2" /> Sign In
                </a>
                <a
                  href="/signup"
                  className="hover:text-black-200 cursor-pointer p-2 mb-2 hover:bg-green-300 rounded-md"
                >
                  <FaUserPlus className="inline-block mr-2" /> Sign Up
                </a>
              </>
            )}

   </div>
 </div>
</nav>

{/* Hero Section */}
<section className="bg-green-700 text-white text-center py-20">
 <h2 className="text-4xl font-bold mb-4">Welcome to our online market</h2>
 <p className="text-xl">Manage products, track inventory, and control your e-commerce platform all in one place.</p>
</section>
        </div>
    ); 
 }

 export default Nav;
 
 