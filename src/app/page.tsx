"use client";

import { Sidebar } from "@/components/Sidebar";
import { AboutMe } from "@/components/AboutMe";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import Chatbot from "@/components/chatbot";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  return (
    <div className="bg-[#f7f7f752] min-h-screen">
      <div className="container max-w-screen-lg mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar Section */}
          <Sidebar />
          {/* Main Section */}
          <main className="md:col-span-2">
            <AboutMe />
            <Projects />
            <Experience />
          </main>
        </div>
      </div>

      {/* ✅ Chatbot appears only on "/" route */}
      {pathname === "/" && <Chatbot />}
    </div>
  );
}
