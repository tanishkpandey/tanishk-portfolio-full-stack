"use client";

import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { LuMoveLeft } from "react-icons/lu";
import Link from "next/link";


const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);

      if (res && res?.user) {
        const token = await res.user.getIdToken();
        document.cookie = `userToken=${token}; path=/;`;
        toast.success("Sign-in successful!");
        router.push("/admin-panel");
      }
    } catch (error: unknown) {
      const errorMessage = (error as { message?: string })?.message;
      toast.error(errorMessage || "Failed to sign in. Please try again.");
    }
  };

  return (
    <>

      <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full">
            <div className="p-8 rounded-2xl bg-background shadow">
              <form className="mt-8 space-y-4">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    User name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      placeholder="Enter user name"
                    />

                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      placeholder="Enter password"
                    />

                  </div>
                </div>

                <div className="!mt-8">
                  <button
                    type="button"
                    onClick={handleSignIn}
                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-gray-800 hover:bg-gray-700 focus:outline-none"
                  >
                    Sign in
                  </button>
                  <Link href="/" className="w-full inline-flex items-center">

                    <button
                      type="button"
                      className="w-full mt-2 py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-gray-800 hover:bg-gray-700 flex justify-center gap-2 items-center focus:outline-none"
                    >
                      <LuMoveLeft className="size-5" />
                      Back to home
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
