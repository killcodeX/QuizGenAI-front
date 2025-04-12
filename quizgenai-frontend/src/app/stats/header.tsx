import React from "react";
import { useRouter } from "next/navigation";
import { UserData } from "./schema";

interface statheaderProps {
  name: string;
  hasData: boolean;
  userData: UserData | null;
}

// Get first letter of first and last name for avatar
// Get first letter of first and last name for avatar
const getInitials = (name: string) => {
  if (name) {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  }
  return "U";
};

// Get user level based on performance
const getUserLevel = (hasData: boolean, userData: UserData) => {
  if (!hasData) return "Quiz Novice";
  const total = userData.performance?.totalQuestions || 0;
  if (total > 100) return "Quiz Master";
  if (total > 50) return "Quiz Expert";
  if (total > 20) return "Quiz Enthusiast";
  return "Quiz Beginner";
};

export default function Header({ name, hasData, userData }: statheaderProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="bg-indigo-600 p-3 rounded-full">
          <div className="text-2xl font-bold">{getInitials(name)}</div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-400">
            {getUserLevel(hasData, userData as UserData)}
          </p>
        </div>
      </div>
      <div
        className="bg-indigo-600 px-6 py-2 rounded-lg font-semibold cursor-pointer transition-colors hover:bg-indigo-700"
        onClick={() => router.push("/quiz")}
      >
        {!hasData ? "Start Your First Quiz" : "Start New Quiz"}
      </div>
    </div>
  );
}
