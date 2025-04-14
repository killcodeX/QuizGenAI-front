import React from "react";
import AvatarDemo from "../../components/avatar";
import { Brain } from "lucide-react";

interface QuizHeaderProps {
  name: string;
  image: string | null;
}

export default function QuizHeader(props: QuizHeaderProps) {
  const { name, image } = props;
  return (
    <nav className="navbar absolute top-0 h-20 px-8 w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Brain className="text-indigo-400" size={28} />
        <h1 className="logo text-xl md:text-3xl font-extrabold">QuizGenAI</h1>
      </div>
      <div className="flex gap-[8px]">
        <AvatarDemo name={name} image={image} />
      </div>
    </nav>
  );
}
