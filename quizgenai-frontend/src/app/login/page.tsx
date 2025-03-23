"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {session ? (
        <div>
          <p>Welcome, {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="p-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => signIn("google")}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}
