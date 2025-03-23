// # Quiz Choose Topic Page (Protected)
"use client";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return <div>Choose your quiz topic</div>;
}
