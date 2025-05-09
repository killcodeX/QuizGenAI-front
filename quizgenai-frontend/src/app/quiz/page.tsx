// # Quiz Choose Topic Page (Protected)
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QuizHeader from "./quizHeader";
import { History, Star, Trophy, Sparkles } from "lucide-react";
import QuizForm from "./quizForm";
import Spinner from "@/components/spinner";

interface userProps {
  name: string;
  email: string;
  image: string | null;
  id: string;
  backendToken: string;
}

export default function QuizPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<userProps>({
    name: "User",
    email: "",
    image: "",
    id: "",
    backendToken: "",
  });

  const [history, setHistory] = useState([]);
  const [popularTopics, setPopularTopics] = useState([]);
  //   { id: 1, name: "JavaScript" },
  //   { id: 2, name: "JavaScript II" },
  //   { id: 3, name: "Marvel" },
  //   { id: 4, name: "Games" },
  //   { id: 5, name: "Python" },
  //   { id: 6, name: "World History" },
  // ];

  const fetchUserHistory = async () => {
    //${process.env.URL}
    try {
      setLoading(true);
      const res = await fetch(`/quizgenai/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.backendToken}`,
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });
      const data = await res.json();
      console.log("Stats history data:", data);
      setHistory(data.quizHistory);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularTopic = async () => {
    //console.log(process.env.URL);
    try {
      setLoading(true);
      const res = await fetch(`/quizgenai/popular`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.backendToken}`,
        },
      });
      const data = await res.json();
      console.log("Stats popular data:", data);
      setPopularTopics(data.popularTopics);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call API only when session is available and authenticated
    if (
      status === "authenticated" &&
      session?.user?.backendToken &&
      session?.user?.email
    ) {
      setUserName({
        name: session.user.name || "User",
        email: session.user.email || "",
        image: session.user.image || "",
        id: session.user.id || "",
        backendToken: session.user.backendToken || "",
      });
      fetchUserHistory();
      fetchPopularTopic();
    }
  }, [status, session]);

  if (status === "loading" || loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <Spinner />
      </div>
    );

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
      <QuizForm token={userName.backendToken} />
      {history.length > 0 && (
        <div
          className={`w-full ${
            history.length > 1 ? "md:w-[800]" : "md:w-[400]"
          }`}
        >
          <h3 className="w-full text-xl font-bold flex items-center gap-2 mb-4">
            <History size={20} className="text-indigo-400" />
            Your Recent Quizzes
          </h3>
          <div
            className={`grid gap-4 ${
              history.length > 1 ? "md:grid-cols-2" : ""
            }`}
          >
            {history.map((quiz: any) => (
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
                  <button
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-sm transition-all"
                    onClick={() =>
                      router.push(`/quiz/${quiz.quizId}?fromHistory=true`)
                    }
                  >
                    Retry
                  </button>
                  {/* <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-all">
                    Share
                  </button> */}
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
          {popularTopics.map((topic: any) => (
            <button
              key={topic.id}
              className="cursor-pointer px-4 py-2 bg-gray-800/70 hover:bg-indigo-800/70 rounded-full text-sm font-medium border border-gray-700 transition-all"
              onClick={() => router.push(`/quiz/${topic.id}`)}
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
            <p className="text-sm">
              You've completed {history.length} quizzes!
            </p>
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
