"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { getData } from "../../../mockData";
import { Toaster } from "sonner";
import QuizModal from "./quizModal";
import Spinner from "@/components/spinner";

interface Quiz {
  id: number;
  question: string;
  correct_answer: string;
  options: string[];
}

export default function QuizQuestions() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const hasScrolledRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchQuizes = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/quizgenai/quizes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.backendToken}`,
        },
        body: JSON.stringify({
          topic_id: params.id,
        }),
      });
      const data = await res.json();
      const fakeData: any = await getData();
      console.log("Stats popular data:", data, fakeData);
      console.log("Stats fake data:", fakeData);
      setQuizes(data.questions);
      //setQuizes(fakeData?.results);
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

  // Function to handle answer selection
  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer, // Overwrites previous selection for that question
    }));
  };

  // Calculate score and right/wrong answers
  const correctCount = Object.keys(selectedAnswers).reduce((count, key) => {
    return selectedAnswers[Number(key)] === quizes[Number(key)]?.correct_answer
      ? count + 1
      : count;
  }, 0);

  const wrongCount = quizes.length - correctCount;
  const score = (correctCount / quizes.length) * 100;

  const handleShowResult = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/quizgenai//save-quiz-result",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.backendToken}`,
          },
          body: JSON.stringify({
            topic_id: params.id,
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
      <div className="quiz-scroll-counter flex flex-col gap-3 fixed top-100 left-1/2 z-1 md:top-1/2 md:right-10 md:left-auto -rotate-90 md:rotate-0 transform md:-translate-y-1/2 ">
        {quizes.map((_: any, index: number) => (
          <button
            key={index}
            className={`counter-steps w-[5px] h-[50px] cursor-pointer ${
              index === activeIndex ? "bg-(--primary)" : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)} //setActiveIndex(index)
          ></button>
        ))}
      </div>
      {quizes.map((item: any, index: number) => (
        <div
          key={index}
          className={`quiz-steps absolute top-0 left-0 w-full h-full flex justify-center items-center transition-opacity duration-500 ${
            index === activeIndex
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          <div className="p-8 rounded-lg shadow-md max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">Question {index + 1}</h3>
            <p className="mb-6">{item.question}</p>
            <div className="space-y-3">
              {item.options.map((answer: string, optIndex: number) => (
                <div
                  key={optIndex}
                  className={`border-1 border-(--primary) rounded-(--borderRadius) p-2 cursor-pointer transition-all hover:bg-(--primary) ${
                    selectedAnswers[index] === answer ? "bg-(--primary)" : ""
                  }`}
                  onClick={() => handleAnswerSelect(index, optIndex + "")}
                >
                  {answer}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
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
