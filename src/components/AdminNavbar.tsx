import Link from "next/link";

const AdminNavbar = () => {
  return (
    <nav className="w-64 bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <ul>
        <li className="mb-2">
          <Link href="/admin-panel/profile" className="hover:underline">
            Profile
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/admin-panel/about-me" className="hover:underline">
            About Me
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/admin-panel/projects" className="hover:underline">
            Projects
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/admin-panel/work-experience" className="hover:underline">
            Work Experience
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
