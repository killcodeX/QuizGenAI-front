import { useState } from "react";
import { useRouter } from "next/navigation";

interface QuizFormProps {
  token: string;
}

export default function QuizForm(props: QuizFormProps) {
  const { token } = props;
  const router = useRouter();
  const [topic, setTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/quizgenai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topic: topic,
        }),
      });
      const data = await res.json();
      console.log("Stats history data:", data);
      router.push(`/quiz/1`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="relative max-w-[400] w-full mx-auto mb-8 flex bg-gray-50 rounded-full border border-gray-300 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      onSubmit={handleSubmit}
    >
      <input
        id="quiz"
        className="block p-2.5 w-full text-sm md:text-lg text-white px-5 border-transparent focus:outline-none"
        autoComplete="off"
        placeholder="Type any topic..."
        value={topic}
        onChange={handleChange}
      />
      <button
        className="text-white bg-(--primary) hover:bg-(--primary)/90 rounded-full p-3 cursor-pointer"
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20.04 2.323c1.016-.355 1.992.621 1.637 1.637l-5.925 16.93c-.385 1.098-1.915 1.16-2.387.097l-2.859-6.432l4.024-4.025a.75.75 0 0 0-1.06-1.06l-4.025 4.024l-6.432-2.859c-1.063-.473-1-2.002.097-2.387z"
          />
        </svg>
      </button>
    </form>
  );
}
