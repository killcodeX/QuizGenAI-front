// # Quiz Choose Topic Page (Protected)
"use client";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const topics = [
  {
    id: 1,
    topic: "Javascript",
  },
  {
    id: 2,
    topic: "Javascript II",
  },
  {
    id: 3,
    topic: "Marvel",
  },
  {
    id: 4,
    topic: "Games",
  },
];

export default function QuizPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [topic, setTopic] = useState("");

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login");
  //   }
  // }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen relative flex flex-col justify-center items-center">
      <nav className="navbar absolute top-0 h-20 px-8 w-full flex justify-between items-center">
        <div className="logo">QuizGenAi</div>
        <div className="flex gap-[8px]">
          <button
            className="px-[12px] py-[8px] bg-(--primary) rounded-(--borderRadius) font-bold text-1xl cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Sign Up
          </button>
        </div>
      </nav>
      <div className="p-6 w-[500]">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3">
            Hi User 👋🏻 <br /> Create a Quiz Now!
          </h1>
          <p className="text-xl text-(--secondary)">
            Enter your desired topic, and get ready for a fun, AI-powered quiz
            experience.
          </p>
        </div>
        <form
          className="max-w-sm mx-auto flex bg-gray-50 rounded-full border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onSubmit={handleSubmit}
        >
          <input
            id="quiz"
            className="block p-2.5 w-full text-lg text-white px-5 border-transparent focus:outline-none"
            autoComplete="none"
            placeholder="Type any topic..."
            value={topic}
            onChange={handleChange}
          />
          <button
            className="text-white bg-(--primary) hover:bg-(--primary)/90 rounded-full p-3 cursor-pointer"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20.04 2.323c1.016-.355 1.992.621 1.637 1.637l-5.925 16.93c-.385 1.098-1.915 1.16-2.387.097l-2.859-6.432l4.024-4.025a.75.75 0 0 0-1.06-1.06l-4.025 4.024l-6.432-2.859c-1.063-.473-1-2.002.097-2.387z"
              />
            </svg>
          </button>
        </form>
        <div className="mt-7 flex gap-3">
          {topics.map((item) => {
            return (
              <div
                key={item.id}
                className="p-3 text-sm rounded-full border border-gray-900"
              >
                {item.topic}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
