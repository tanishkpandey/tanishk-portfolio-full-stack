'use client';

import { Sidebar } from "@/components/Sidebar";
import { AboutMe } from "@/components/AboutMe";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";

export default function Home() {
  return (
    <div className="">
      <div className="container max-w-screen-lg mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:sticky md:top-24 h-fit">
            <Sidebar />
          </div>

          {/* Main content */}
          <main className="md:col-span-2 space-y-10">
            <AboutMe />
            <Experience />
            <Projects />
          </main>
        </div>
      </div>
    </div>
  );
}
