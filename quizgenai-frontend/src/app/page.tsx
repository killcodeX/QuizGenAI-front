"use client";
import { Marquee } from "../components/marquee";
import { Timeline } from "../components/timeline";
import { useRouter } from "next/navigation";
import { Brain } from "lucide-react";

export default function Home() {
  const router = useRouter();
  return (
    <main className="w-full">
      <div className="h-screen bg-hero-custom relative flex flex-col justify-center items-center">
        <nav className="navbar absolute top-0 h-20 px-8 w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="text-xl text-indigo-400" size={28} />
            <h1 className="logo text-xl md:text-3xl font-extrabold">
              QuizGenAI
            </h1>
          </div>
          <div className="flex gap-[8]">
            <button
              className="px-[8] py-[4] md:px-[12] md:py-[8] md:text-1xl border-1 border-(--primary) rounded-(--borderRadius) font-bold  cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Log in
            </button>
            <button
              className="px-[8] py-[4] md:px-[12] md:py-[8] md:text-1xl bg-(--primary) rounded-(--borderRadius) font-bold cursor-pointer"
              onClick={() => router.push("/register")}
            >
              Sign Up
            </button>
          </div>
        </nav>
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-4 md:mb-6 tracking-tight">
              From idea to scale.
              <br />
              Simplified.
            </h1>
            <p className="text-lg md:text-xl xl:text-2xl font-light text-white text-center text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
              Ship production apps at lightning speed, and scale to a global
              audience effortlessly with our next-gen serverless database.
            </p>
          </div>
          <button
            className="px-[24px] py-[12px] bg-(--primary) rounded-(--borderRadius) font-bold text-1xl cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Get Started Now
          </button>
        </section>
        <Marquee />
      </div>
      <div className="relative flex flex-col items-start">
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-extrabold text-center mb-4 md:mb-6 tracking-tight">
              Unlock Your Knowledge, Effortlessly
            </h1>
            <p className="text-lg md:text-xl xl:text-1xl font-light text-center text-(--secondary) mb-8 md:mb-10 max-w-2xl mx-auto">
              Take control of your learning with our intuitive quiz app. Simply
              choose a topic, and Gemini AI will generate engaging questions.
              Track your progress, analyze your strengths, and enjoy a secure
              and scalable learning environment.
            </p>
          </div>
        </section>
        <Timeline />
      </div>
      <div className="h-full">
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center mb-4 md:mb-6 tracking-tight">
              Ready to try GenQuizAI?
            </h1>
            <p className="text-lg md:text-xl xl:text-1xl font-light text-center text-(--secondary) mb-8 md:mb-10 max-w-2xl mx-auto">
              Deploy a database in an instant to experience the power of Prisma.
            </p>
          </div>
          <button
            className="px-[24px] py-[12px] bg-(--primary) rounded-(--borderRadius) font-bold text- cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Get Started Now
          </button>
        </section>
      </div>
      <footer className="h-full mb-8">
        <div className="max-w-4xl mx-auto">
          <hr className="h-px my-8 border-0 bg-gray-900" />
          <p className="text-lg md:text-xl xl:text-xl font-light text-center text-muted-foreground text-(--secondary) max-w-2xl mx-auto">
            © 2025 GenQuizAI, Inc.
          </p>
        </div>
      </footer>
    </main>
  );
}
