import React from "react";
import { useRouter } from "next/navigation";
import { HasData, UserData } from "./schema";
import { Award } from "lucide-react";

interface popProps {
  count: number;
  id: string;
  name: string;
}

interface favoritesProps {
  popularTopics: popProps[];
}

export default function Favorites(props: favoritesProps) {
  const { popularTopics } = props;
  const router = useRouter();

  if (popularTopics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Award size={64} className="text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
        <p className="text-gray-400 text-center max-w-md mb-6">
          Mark topics as favorites during or after quizzes to access them
          quickly
        </p>
        <button
          className="bg-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          onClick={() => router.push("/quiz")}
        >
          Explore Topics
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-6">Your Favorite Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {popularTopics.map((topic, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-lg p-5 cursor-pointer hover:bg-gray-600 transition-colors"
            onClick={() => router.push(`/quiz/${topic.id}`)}
          >
            <h3 className="font-semibold mb-2">{topic.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Practice again</span>
              <Award className="text-yellow-400" size={18} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
