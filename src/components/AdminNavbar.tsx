import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";

const AdminNavbar = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear user token from cookies
      document.cookie =
        "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      location.reload(); // Reload the page after logout
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-6 flex items-center justify-between">
      {/* Left Section: Branding or Title */}
      <div>
        <h2 className="text-2xl font-bold">Tanishk's Dashboard</h2>
      </div>

      {/* Right Section: Navigation Links and Logout */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="text-lg hover:underline">
          Dashboard
        </Link>
        <Link href="/settings" className="text-lg hover:underline">
          Settings
        </Link>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
