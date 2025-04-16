import { Option } from "lucide-react";

let obj = {
  response_code: 0,
  results: [
    {
      category: "Entertainment: Cartoon &amp; Animations",
      question:
        "The song &#039;Little April Shower&#039; features in which Disney cartoon film?",
      correct_answer: 1,
      options: ["Cinderella", "Bambi", "Pinocchio", "The Jungle Book"],
    },
    {
      type: "multiple",
      category: "History",
      question: "How many manned moon landings have there been?",
      correct_answer: 3,
      options: ["1", "3", "7", "6"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Vehicles",
      question:
        "Where are the cars of the brand &quot;Ferrari&quot; manufactured?",
      correct_answer: 2,
      options: ["Romania", "Germany", "Italy", "Russia"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "General Knowledge",
      question: "What geometric shape is generally used for stop signs?",
      correct_answer: 0,
      options: ["Octagon", "Hexagon", "Circle", "Triangle"],
    },
    {
      type: "boolean",
      difficulty: "easy",
      category: "Geography",
      question: "Alaska is the largest state in the United States.",
      correct_answer: 0,
      options: ["True", "False"],
    },
  ],
};

export const getData = () => {
  // Type obj as needed
  return new Promise((resolve) => {
    setTimeout(() => {
      // const jsonString = JSON.stringify(obj);
      // const response = new Response(jsonString, {
      //   status: 200,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      //resolve(response);
      resolve(obj);
    }, 2000);
  });
};
