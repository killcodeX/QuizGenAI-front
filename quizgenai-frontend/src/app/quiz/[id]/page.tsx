"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { getData } from "../../../mockData";
import { Toaster } from "sonner";
import QuizModal from "./quizModal";
import Spinner from "@/components/spinner";
import { useFetch } from "../../../hooks/useFetch";
import ScrollIndicator from "./scrollIndicator";
import Question from "./question";

interface Quiz {
  id: number;
  question: string;
  questionId: string;
  correct_answer: string;
  options: string[];
}

export default function QuizQuestions() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [result, setResult] = useState<{
    [key: string]: string;
  }>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const hasScrolledRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchQuizes = async () => {
    try {
      setLoading(true);
      const isQuizId = searchParams.get("fromHistory") === "true";

      const res = await fetch("http://localhost:8000/quizgenai/quizes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.backendToken}`,
        },
        body: JSON.stringify({
          ...(isQuizId ? { quiz_id: params.id } : { topic_id: params.id }),
        }),
      });
      const data = await res.json();
      //const fakeData: any = await getData();
      //console.log("Stats fake data:", data);
      setResult(data);
      setQuizes(data.questions);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.backendToken) {
      fetchQuizes();
    }
  }, [status, session]);

  const navigateQuiz = useCallback(
    (direction: "up" | "down") => {
      setActiveIndex((prevIndex) => {
        if (direction === "up" && prevIndex > 0) {
          //console.log(`Navigating UP: New index -> ${prevIndex - 1}`);
          return prevIndex - 1;
        } else if (direction === "down" && prevIndex < quizes.length - 1) {
          //console.log(`Navigating DOWN: New index -> ${prevIndex + 1}`);
          return prevIndex + 1;
        }
        //console.log("No change in index.");
        return prevIndex;
      });
    },
    [quizes.length]
  );

  const handleScroll = useCallback(
    (event: WheelEvent) => {
      if (hasScrolledRef.current) {
        //console.log("Scroll blocked.");
        return;
      }

      //console.log("Scroll detected.");
      hasScrolledRef.current = true;

      if (event.deltaY > 0) {
        navigateQuiz("down");
      } else {
        navigateQuiz("up");
      }

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        hasScrolledRef.current = false;
        //console.log("Scroll reset.");
      }, 1000);
    },
    [navigateQuiz]
  );

  useEffect(() => {
    document.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleScroll]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        navigateQuiz("up");
      }

      if (event.key === "ArrowDown") {
        navigateQuiz("down");
      }
    },
    [navigateQuiz]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigateQuiz]); // Add navigateQuiz to the dependency array

  // Function to handle answer selection with toggle capability
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => {
      // If the same answer is already selected, remove it (unselect)
      if (prev[questionId] === answer) {
        const { [questionId]: removed, ...rest } = prev;
        return rest;
      }

      // Otherwise, set or update the selection
      return {
        ...prev,
        [questionId]: answer,
      };
    });
  };

  // Calculate score and right/wrong answers
  const correctCount = Object.keys(selectedAnswers).reduce(
    (count: number, questionId: string) => {
      // Find the question with matching ID
      const question = quizes.find((q) => q.questionId === questionId);

      // If question found and answer is correct, increment count
      return question &&
        selectedAnswers[questionId] === question?.correct_answer
        ? count + 1
        : count;
    },
    0
  );

  const wrongCount = quizes.length - correctCount;
  const score = (correctCount / quizes.length) * 100;

  const handleShowResult = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/quizgenai/save-quiz-result",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.backendToken}`,
          },
          body: JSON.stringify({
            userId: session?.user?.id,
            topicId: params.id,
            quizId: result.quizId,
            score: correctCount,
            totalPoints: quizes.length,
            selectedAnswers: selectedAnswers,
          }),
        }
      );
      const data = await res.json();
      console.log("Stats popular data:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setShowResults(true);
    }
  };

  if (quizes.length === 0 && (status === "loading" || loading))
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <Spinner />
      </div>
    );

  return (
    <div className="h-screen relative overflow-hidden quiz-container">
      <Toaster />
      <ScrollIndicator
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        quizes={quizes}
      />
      {quizes.map((item: Quiz, index: number) => {
        return (
          <Question
            key={index}
            item={item}
            index={index}
            activeIndex={activeIndex}
            selectedAnswers={selectedAnswers}
            handleAnswerSelect={handleAnswerSelect}
          />
        );
      })}
      <div className="absolute bottom-10 z-1 w-full flex justify-center">
        {Object.keys(selectedAnswers).length === quizes.length && (
          <button
            className="px-[12px] py-[8px] border-1 border-(--primary) rounded-(--borderRadius) font-bold text-1xl cursor-pointer text-(--primary) hover:bg-(--primary) hover:text-white"
            onClick={handleShowResult}
          >
            Show Result
          </button>
        )}
      </div>
      {/* Modal for showing quiz results */}
      {showResults && (
        <QuizModal
          showResults={showResults}
          setShowResults={setShowResults}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          setActiveIndex={setActiveIndex}
          correctCount={correctCount}
          wrongCount={wrongCount}
          quizes={quizes}
        />
      )}
    </div>
  );
}
