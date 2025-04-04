"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { getData } from "../../../mockData";
import { Toaster } from "sonner";
import QuizModal from "./quizModal";

export default function QuizQuestions() {
  const [quizes, setQuizes] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const hasScrolledRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchQuizes = async () => {
      const response = await getData();
      const result = await response.json();
      setQuizes(result.results);
    };

    fetchQuizes();
  }, []);

  const navigateQuiz = useCallback(
    (direction: "up" | "down") => {
      setActiveIndex((prevIndex) => {
        if (direction === "up" && prevIndex > 0) {
          console.log(`Navigating UP: New index -> ${prevIndex - 1}`);
          return prevIndex - 1;
        } else if (direction === "down" && prevIndex < quizes.length - 1) {
          console.log(`Navigating DOWN: New index -> ${prevIndex + 1}`);
          return prevIndex + 1;
        }
        console.log("No change in index.");
        return prevIndex;
      });
    },
    [quizes.length]
  );

  const handleScroll = useCallback(
    (event: WheelEvent) => {
      if (hasScrolledRef.current) {
        console.log("Scroll blocked.");
        return;
      }

      console.log("Scroll detected.");
      hasScrolledRef.current = true;

      if (event.deltaY > 0) {
        navigateQuiz("down");
      } else {
        navigateQuiz("up");
      }

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        hasScrolledRef.current = false;
        console.log("Scroll reset.");
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

  if (quizes.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading....
      </div>
    );
  }

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
              {[...item.incorrect_answers, item.correct_answer].map(
                (answer: string, i: number) => (
                  <div
                    key={i}
                    className={`border-1 border-(--primary) rounded-(--borderRadius) p-2 cursor-pointer transition-all hover:bg-(--primary) ${
                      selectedAnswers[index] === answer ? "bg-(--primary)" : ""
                    }`}
                    onClick={() => handleAnswerSelect(index, answer)}
                  >
                    {answer}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-10 z-1 w-full flex justify-center">
        {Object.keys(selectedAnswers).length === quizes.length && (
          <button
            className="px-[12px] py-[8px] border-1 border-(--primary) rounded-(--borderRadius) font-bold text-1xl cursor-pointer text-(--primary) hover:bg-(--primary) hover:text-white"
            onClick={() => setShowResults(true)}
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

// "use client";
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { getData } from "../../../mockData";

// export default function QuizQuestions() {
//   const [quizes, setQuizes] = useState<any>([]);
//   const [activeIndex, setActiveIndex] = useState<number>(0);
//   const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
//   const [canScroll, setCanScroll] = useState<boolean>(true);
//   const [selectedAnswers, setSelectedAnswers] = useState<any>([]);
//   const lastDirectionRef = useRef<string | null>(null);

//   useEffect(() => {
//     const fetchQuizes = async () => {
//       const response = await getData();
//       const result = await response.json();
//       setQuizes(result.results);
//     };

//     fetchQuizes();
//   }, []);

//   const navigateQuiz = useCallback(
//     (direction: string) => {
//       //console.log("Navigating:", direction);
//       lastDirectionRef.current = direction;

//       if (direction === "up" && activeIndex <= 0) {
//         setCanScroll(true);
//         return;
//       }

//       if (direction === "down" && activeIndex >= quizes.length - 1) {
//         setCanScroll(true);
//         return;
//       }

//       setIsTransitioning(true);
//       setActiveIndex((prev) => (direction === "down" ? prev + 1 : prev - 1));

//       setTimeout(() => {
//         setIsTransitioning(false);
//       }, 500);
//     },
//     [activeIndex, quizes?.length]
//   );

//   // Improved approach with debounce-like behavior
//   const detectScrollStop = useCallback(() => {
//     console.log("Waiting for scroll reset...");

//     // Instead of checking for specific wheel events, let's use a simple timeout
//     // This will re-enable scrolling after a short duration regardless of wheel movement
//     const timer = setTimeout(() => {
//       console.log("Re-enabling scroll");
//       setCanScroll(true);
//     }, 3000); // Wait 1 second before allowing another scroll

//     return () => clearTimeout(timer); // Clean up timer if component changes
//   }, []);

//   const handleScroll = useCallback(
//     (event: WheelEvent) => {
//       if (!canScroll || isTransitioning) {
//         return;
//       }

//       if (event.deltaY > 0) {
//         navigateQuiz("down");
//       } else {
//         navigateQuiz("up");
//       }

//       setCanScroll(false);
//       const cleanup = detectScrollStop();

//       // Add safety mechanism to ensure canScroll gets reset eventually
//       const safetyTimer = setTimeout(() => {
//         setCanScroll(true);
//         console.log("Safety timer reset canScroll");
//       }, 2000);

//       return () => {
//         cleanup();
//         clearTimeout(safetyTimer);
//       };
//     },
//     [canScroll, isTransitioning, navigateQuiz, detectScrollStop]
//   );

//   useEffect(() => {
//     console.log(selectedAnswers);
//   }, [selectedAnswers]);

//   useEffect(() => {
//     //console.log("Setting up wheel event listener");

//     document.addEventListener("wheel", handleScroll);

//     return () => {
//       document.removeEventListener("wheel", handleScroll);
//     };
//   }, [handleScroll]);

//   if (quizes.length === 0) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         Loading....
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen relative overflow-hidden quiz-container">
//       <div className="quiz-scroll-counter fixed top-1/2 right-10 flex flex-col gap-3 transform -translate-y-1/2">
//         {quizes.map((item: any, index: number) => {
//           return (
//             <div
//               key={index}
//               className={`counter-steps w-[5px] h-[50px] ${
//                 index === activeIndex ? "bg-(--primary)" : "bg-gray-300"
//               }`}
//             ></div>
//           );
//         })}
//       </div>
//       {quizes.map((item: any, index: number) => {
//         return (
//           <div
//             key={index}
//             className={`quiz-steps absolute top-0 left-0 w-full h-full flex justify-center items-center transition-opacity duration-500 ${
//               index === activeIndex
//                 ? "opacity-100 visible"
//                 : "opacity-0 invisible"
//             }`}
//           >
//             <div className=" p-8 rounded-lg shadow-md max-w-2xl w-full">
//               <h3 className="text-xl font-bold mb-4">Question {index + 1}</h3>
//               <p className="mb-6">{item.question}</p>
//               <div className="space-y-3">
//                 {item.incorrect_answers.map((answer: string, index: number) => {
//                   return (
//                     <div
//                       key={index}
//                       className={`border-1 border-(--primary) rounded-(--borderRadius) p-2 cursor-pointer hover:bg-(--primary) ${
//                         selectedAnswers[activeIndex] &&
//                         selectedAnswers[activeIndex].selected === answer &&
//                         "bg-(--primary)"
//                       }`}
//                       onClick={() =>
//                         setSelectedAnswers([
//                           ...selectedAnswers,
//                           {
//                             selected: answer,
//                             correct: item.correct_answer,
//                             point: answer === item.correct_answer,
//                           },
//                         ])
//                       }
//                     >
//                       {answer}
//                     </div>
//                   );
//                 })}
//                 <div className="border-1 border-(--primary) rounded-(--borderRadius) p-2 cursor-pointer hover:bg-(--primary)">
//                   {item.correct_answer}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
