// # Quiz Choose Topic Page (Protected)
"use client";
import { useSession } from "next-auth/react";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QuizHeader from "./quizHeader";
import { Send, Brain, History, Star, Trophy, Sparkles } from "lucide-react";
import QuizForm from "./quizForm";

interface userProps {
  name: string;
  email: string;
  image?: string;
  id: string;
  backendToken: string;
}

export default function QuizPage() {
  const { user } = useAuth();

  const { data: session, status } = useSession();
  const [userName, setUserName] = useState<userProps>({
    name: "User",
    email: "",
    image: "/blank-user-svgrepo-com.svg",
    id: "",
    backendToken: "",
  });

  const [history, setHistory] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      score: "8/10",
      date: "April 10, 2025",
    },
    {
      id: 2,
      title: "Marvel Cinematic Universe",
      score: "7/10",
      date: "April 9, 2025",
    },
    {
      id: 3,
      title: "Classic Video Games",
      score: "10/10",
      date: "April 8, 2025",
    },
  ]);

  const popularTopics = [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "JavaScript II" },
    { id: 3, name: "Marvel" },
    { id: 4, name: "Games" },
    { id: 5, name: "Python" },
    { id: 6, name: "World History" },
  ];

  useEffect(() => {
    // Update username when session loads
    if (session?.user) {
      setUserName({
        name: session.user.name || "User",
        email: session.user.email || "",
        image: session.user.image || "",
        id: session.user.id || "",
        backendToken: session.user.backendToken || "",
      });
    }
  }, [session]);

  return (
    <div className="h-screen relative flex flex-col justify-center items-center">
      <QuizHeader name={userName.name} image={userName.image} />
      <div className="p-6 w-full md:w-[800]">
        {history.length === 0 ? (
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Hi
              <span className="px-2 text-indigo-300">
                {userName.name.split(" ")[0]}
              </span>{" "}
              👋🏻 <br /> Create a Quiz Now!
            </h1>
            <p className="text-lg md:text-xl text-(--secondary)">
              Enter your desired topic, and get ready for a fun, AI-powered quiz
              experience.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Welcome Back{" "}
              <span className="text-indigo-300">
                {" "}
                {userName.name.split(" ")[0]}
              </span>
              ! 🎯
            </h2>
            <p className="text-lg md:text-xl text-(--secondary)">
              Ready for another knowledge challenge?
            </p>
          </div>
        )}
      </div>
      <QuizForm />
      {history.length > 0 && (
        <div className="w-full md:w-[800]">
          <h3 className="w-full text-xl font-bold flex items-center gap-2 mb-4">
            <History size={20} className="text-indigo-400" />
            Your Recent Quizzes
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {recentQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 hover:bg-gray-800/80 transition-all"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-lg">{quiz.title}</h4>
                  <div className="flex items-center gap-1 bg-indigo-900/70 px-2 py-1 rounded-md">
                    <Trophy size={14} className="text-yellow-400" />
                    <span className="text-sm">{quiz.score}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-2">{quiz.date}</p>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-sm transition-all">
                    Retry
                  </button>
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-all">
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="w-full md:w-[800] mt-6 flex flex-col justify-center items-center">
        <h4 className="text-gray-400 mb-3 text-sm uppercase tracking-wide">
          Trending Topics
        </h4>
        <div className="flex flex-wrap gap-2">
          {popularTopics.map((topic) => (
            <button
              key={topic.id}
              className="px-4 py-2 bg-gray-800/70 hover:bg-indigo-800/70 rounded-full text-sm font-medium border border-gray-700 transition-all"
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>
      {history.length > 0 && (
        <div className="flex justify-center mt-6">
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg p-4 inline-flex items-center gap-2">
            <Star className="text-yellow-400" size={20} />
            <p className="text-sm">You've completed 14 quizzes this month!</p>
          </div>
        </div>
      )}
      {history.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-12 p-6 bg-indigo-950/50 rounded-xl border border-indigo-800/50 max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="text-yellow-400" size={20} />
            <h3 className="text-xl font-bold">New to QuizGenAI?</h3>
          </div>
          <p className="text-gray-300 text-left">
            Simply enter any topic you're interested in, and our AI will
            generate a custom quiz just for you. Test your knowledge and track
            your progress over time!
          </p>
        </div>
      )}
      {/* Footer with error indicator */}
      <footer className="fixed bottom-4 left-4">
        {history.length === 0 && (
          <div className="flex items-center bg-red-500/80 text-white px-3 py-1 rounded-full text-sm">
            <span className="font-bold mr-1">N</span>
            <span>1 Issue</span>
            <button className="ml-2 text-white/80 hover:text-white">×</button>
          </div>
        )}
      </footer>
    </div>
  );
}
