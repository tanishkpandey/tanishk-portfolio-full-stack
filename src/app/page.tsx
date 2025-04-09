'use client';

import { Sidebar } from "@/components/Sidebar";
import { AboutMe } from "@/components/AboutMe";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";

export default function Home() {
  return (
    <div className="bg-[#f7f7f752] min-h-screen">
      <div className="container max-w-screen-lg mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:sticky md:top-24 h-fit">
            <Sidebar />
          </div>

          {/* Main content */}
          <main className="md:col-span-2 space-y-10">
            <AboutMe />
            <Projects />
            <Experience />
          </main>
        </div>
      </div>
    </div>
  );
}
