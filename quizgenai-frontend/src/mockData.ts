let obj = {
  response_code: 0,
  results: [
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Cartoon &amp; Animations",
      question:
        "The song &#039;Little April Shower&#039; features in which Disney cartoon film?",
      correct_answer: "Bambi",
      incorrect_answers: ["Cinderella", "Pinocchio", "The Jungle Book"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "History",
      question: "How many manned moon landings have there been?",
      correct_answer: "6",
      incorrect_answers: ["1", "3", "7"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Vehicles",
      question:
        "Where are the cars of the brand &quot;Ferrari&quot; manufactured?",
      correct_answer: "Italy",
      incorrect_answers: ["Romania", "Germany", "Russia"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "General Knowledge",
      question: "What geometric shape is generally used for stop signs?",
      correct_answer: "Octagon",
      incorrect_answers: ["Hexagon", "Circle", "Triangle"],
    },
    {
      type: "boolean",
      difficulty: "easy",
      category: "Geography",
      question: "Alaska is the largest state in the United States.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
  ],
};

export const getData = () => {
  // Type obj as needed
  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      const jsonString = JSON.stringify(obj);
      const response = new Response(jsonString, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
      resolve(response);
    }, 2000);
  });
};
