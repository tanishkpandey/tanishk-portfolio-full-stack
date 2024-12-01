import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import toast from "react-hot-toast";

const AdminNavbar = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie =
        "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      location.reload();
      toast.success("Logout successful!");
    } catch (error: any) {
      toast.error(error.message || "Failed to logout. Please try again.");
      console.error("Logout error:", error.message);
    }
  };

  return (
    <nav className="bg-white shadow mb-5 text-gray-800 p-6 flex items-center justify-between rounded-b-lg">
      {/* Left Section: Branding or Title */}
      <div>
        <h2 className="text-2xl font-bold tracking-wide">
          Tanishk
        </h2>
      </div>

      {/* Right Section: Navigation Links and Logout */}
      <div className="flex items-center space-x-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md hover:shadow-lg transition-all"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
