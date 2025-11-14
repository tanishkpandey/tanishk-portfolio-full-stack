"use client"

import { useState, useRef, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { auth } from "@/app/firebase/config"
import { onAuthStateChanged, User } from "firebase/auth"

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuHeight, setMenuHeight] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => setUser(firebaseUser))

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(isMenuOpen ? menuRef.current.scrollHeight : 0)
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="container max-w-screen-lg mx-auto rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow cursor-pointer transition sticky top-1 z-10">
      <div className="container max-w-screen-lg mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-foreground">Tanishk</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center ">
            <Link
              href="/"
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            {/* <Link
              href="/blogs"
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Blogs
            </Link> */}
            {/* <Link
              href="/snippets"
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Snippets
            </Link> */}
            <Link
              href="/resources"
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Resources
            </Link>
            {user && (
              <Link
                href="/admin-panel"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                Dashboard
              </Link>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden`}
          style={{ maxHeight: `${menuHeight}px` }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block text-foreground hover:text-primary px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            {/* <Link
              href="/blogs"
              className="block text-foreground hover:text-primary px-3 py-2 rounded-md text-base font-medium"
            >
              Blogs
            </Link> */}
            {/* <Link
              href="/snippets"
              className="block text-foreground hover:text-primary px-3 py-2 rounded-md text-base font-medium"
            >
              Snippets
            </Link> */}
            <Link
              href="/resources"
              className="block text-foreground hover:text-primary px-3 py-2 rounded-md text-base font-medium"
            >
              Resources
            </Link>
            {user && (
              <Link
                href="/admin-panel"
                className="block text-foreground hover:text-primary px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
