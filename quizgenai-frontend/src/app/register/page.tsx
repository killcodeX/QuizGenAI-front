"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  // Redirect if already logged in
  if (session) {
    router.push("/quiz");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Store the token in a cookie
      document.cookie = `token=${data.token}; path=/;`;

      // Registration successful
      toast.success("Registration successful", {
        description: "Your account has been created",
      });

      router.push("/test");
    } catch (error: any) {
      toast.error("Registration failed", {
        description: error.message || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add this near the top of your file but inside your component
  useEffect(() => {
    // Run only once on component mount
    const errorMessage = new URLSearchParams(window.location.search).get(
      "error"
    );

    if (errorMessage) {
      console.log("Initial error check:", errorMessage);
      setError(errorMessage);

      // Clear the URL parameter
      window.history.replaceState({}, "", "/login");
    }
  }, []); // Empty dependency array - runs only once

  return (
    <div className="h-screen relative flex flex-col justify-center items-center">
      <div className="p-6 w-full md:w-[500]">
        <div className="mb-3 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Get Started!</h1>
          <p className="text-lg md:text-xl text-(--secondary)">
            Create your free account in just a few steps.
          </p>
        </div>
        {error && (
          <div className="mx-w-300 border-1 border-red-800 bg-red-200 text-red-800 p-2 mb-5 text-center rounded-lg">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-[16] max-w-sm mx-auto"
        >
          <div className="form-group">
            <label
              htmlFor="full-name-icon"
              className="block mb-2 text-sm font-medium text-white"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </div>
              <input
                type="text"
                id="full-name-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your full name"
                name="fullname"
                value={userData.fullname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="email-address-icon"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="text"
                id="email-address-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@xyz.com"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="password-address-icon"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="password"
                id="password-address-icon"
                name="password"
                placeholder="•••••••••"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-[12px] py-[8px] bg-(--primary) rounded-(--borderRadius) font-bold text-1xl"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium -translate-x-1/2 bg-(--background) left-1/2 text-(--secondary)">
            or
          </span>
        </div>
        <div className="max-w-sm mx-auto">
          <button
            type="button"
            className="w-full text-white bg-(--primary) hover:bg-(--primary)/90 text-1xl font-bold rounded-lg px-5 py-2.5 text-center inline-flex justify-center items-center mb-2"
            onClick={() => signIn("google")}
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
        <div className="mt-2 text-center text-(--secondary)">
          Already member?{" "}
          <Link className="underline" href="/login">
            Login to your account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
