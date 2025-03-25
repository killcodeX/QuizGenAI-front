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
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-4 md:mb-6 tracking-tight">
            From idea to scale.
            <br />
            Simplified.
          </h1>
          <p className="text-lg md:text-xl xl:text-2xl font-light text-center text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
            Ship production apps at lightning speed, and scale to a global
            audience effortlessly with our next-gen serverless database.
          </p>
        </div>
        <button className="px-[24px] py-[12px] bg-(--primary) rounded-(--borderRadius) font-bold text-1xl">
          Get Started Now
        </button>
      </section>
      <Marquee />
    </div>
  );
}
