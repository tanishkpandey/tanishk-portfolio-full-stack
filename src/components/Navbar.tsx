"use client";

import { useState, useRef, useEffect } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef(null);
  
  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(isMenuOpen ? menuRef.current.scrollHeight : 0);
    }
  }, [isMenuOpen]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="rounded-lg  border bg-card text-card-foreground shadow-sm hover:shadow cursor-pointer transition sticky top-1 z-10 ">
      <div className="container max-w-screen-lg mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-800">Tanishk</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="blogs" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Blogs</a>
              <a href="snippets" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Snippets</a>
              <a href="resources" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Resources</a>
              {/* <a href="#contact" className=" text-white px-4 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700 ">Contact</a> */}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu with smooth animation */}
      <div 
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${menuHeight}px` }}
      >
        <div ref={menuRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="/blogs" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Blogs</a>
          <a href="/snippets" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Snippets</a>
          <a href="/resources" className="bg-gray-800 hover:bg-gray-700  text-white block px-3 py-2 rounded-md text-base font-medium ">Resources</a>
        </div>
      </div>
    </nav>
  );
};