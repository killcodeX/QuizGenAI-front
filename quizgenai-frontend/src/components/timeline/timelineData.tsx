import Image from "next/image";
import {
  Wand2,
  CheckCircle2,
  ListChecks,
  BarChart,
  Lock,
  Layers,
  Brain,
} from "lucide-react";

export const timelineData = [
  {
    title: "Instant Quiz Generation",
    description:
      "Dive into quizzes on any topic imaginable! Powered by Gemini AI, simply enter your interest and instantly generate a unique set of challenging questions.",
    image: (
      <div className="text-center text-(--primary) text-glow">
        <Wand2 size={48} />
      </div>
    ),
  },
  {
    title: "Real-time Feedback & Scoring",
    description:
      "Get immediate feedback on your answers as you progress. Our intelligent scoring system tracks your performance in real-time, keeping you engaged and informed.",
    image: (
      <div className="text-center text-(--primary) text-glow">
        <CheckCircle2 size={48} />
      </div>
    ),
  },
  {
    title: "Comprehensive Quiz History",
    description:
      "Review your past quiz attempts with detailed records. Analyze your performance on each question and track your learning journey over time.",
    image: (
      <div className="text-center text-(--primary) text-glow">
        <ListChecks size={48} />
      </div>
    ),
  },
  {
    title: "Insightful Performance Statistics",
    description:
      "Visualize your progress with interactive graphs. Understand your strengths and weaknesses across different topics, helping you focus your learning efforts.",
    image: (
      <div className="text-center text-(--primary) text-glow">
        <BarChart size={48} />
      </div>
    ),
  },
  {
    title: "Secure User Authentication",
    description:
      "Your progress and data are securely stored. With Auth.js integration, enjoy a seamless and protected login experience.",
    image: (
      <div className="text-center text-(--primary) text-glow">
        <Lock size={48} />
      </div>
    ),
  },
  {
    title: "Flexible and Scalable Architecture",
    description:
      "Built with cutting-edge technologies like Next.js, Tailwind CSS, Shadcn UI, Node.js, Express, PostgreSQL, Docker, and Prisma, our app delivers a fast, responsive, and scalable experience",
    image: (
      <div className="text-center text-(--primary) text-glow">
        <Layers size={48} />
      </div>
    ),
  },
  {
    title: "Powered by Gemini AI",
    description:
      "Experience the power of Google's Gemini AI, providing intelligent quiz generation and ensuring a dynamic and engaging learning experience.",
    image: (
      <div className="text-center text-(--primary) text-glow">
        <Brain size={48} />
      </div>
    ),
  },
];
