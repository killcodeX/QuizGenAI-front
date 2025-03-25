import Image from "next/image";
import { Marquee } from "../components/marquee";

export default function Home() {
  return (
    <div className="h-screen bg-hero-custom relative flex flex-col justify-center items-center">
      <div className="navbar absolute top-0 h-20 px-8 w-full flex justify-between items-center">
        <div className="logo">QuizGenAi</div>
        <div className="flex gap-[8px]">
          <button className="px-[12px] py-[8px] border-1 border-(--primary) rounded-(--borderRadius) font-bold text-1xl">
            Log in
          </button>
          <button className="px-[12px] py-[8px] bg-(--primary) rounded-(--borderRadius) font-bold text-1xl">
            Sign Up
          </button>
        </div>
      </div>
      <div className="app-description text-center max-w-200 w-full">
        <h1 className="text-7xl font-bold text-center mb-[16px]">
          From idea to scale.
          <br />
          Simplified.
        </h1>
        <div className="text-2xl font-light text-center max-w-400 mb-[32px]">
          Ship production apps at lightning speed, and scale to a global
          audience effortlessly with our next-gen serverless database.
        </div>
        <button className="px-[24px] py-[12px] bg-(--primary) rounded-(--borderRadius) font-bold text-1xl">
          Get Started Now
        </button>
      </div>
      <Marquee />
    </div>
  );
}
