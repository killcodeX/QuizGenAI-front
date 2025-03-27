import Image from "next/image";
import { Marquee } from "../components/marquee";
import { Timeline } from "../components/timeline";

export default function Home() {
  return (
    <main className="w-full">
      <div className="h-screen bg-hero-custom relative flex flex-col justify-center items-center">
        <nav className="navbar absolute top-0 h-20 px-8 w-full flex justify-between items-center">
          <div className="logo">QuizGenAi</div>
          <div className="flex gap-[8px]">
            <button className="px-[12px] py-[8px] border-1 border-(--primary) rounded-(--borderRadius) font-bold text-1xl">
              Log in
            </button>
            <button className="px-[12px] py-[8px] bg-(--primary) rounded-(--borderRadius) font-bold text-1xl">
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
      <div className="relative flex flex-col items-start">
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center mb-4 md:mb-6 tracking-tight">
              We built something truly unique
            </h1>
            <p className="text-lg md:text-xl xl:text-1xl font-light text-center text-muted-foreground text-(--secondary) mb-8 md:mb-10 max-w-2xl mx-auto">
              With our modern serverless architecture, and tight integration
              with Prisma ORM, we created a database that feels like magic and
              scales as fast as your ideas.
            </p>
          </div>
        </section>
        <Timeline />
      </div>
      <div className="h-full">
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center mb-4 md:mb-6 tracking-tight">
              Ready to try Prisma?
            </h1>
            <p className="text-lg md:text-xl xl:text-1xl font-light text-center text-muted-foreground text-(--secondary) mb-8 md:mb-10 max-w-2xl mx-auto">
              Deploy a database in an instant to experience the power of Prisma.
            </p>
          </div>
          <button className="px-[24px] py-[12px] bg-(--primary) rounded-(--borderRadius) font-bold text-1xl">
            Get Started Now
          </button>
        </section>
      </div>
      <footer className="h-full mb-8">
        <div className="max-w-4xl mx-auto">
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <p className="text-lg md:text-xl xl:text-1xl font-light text-center text-muted-foreground text-(--secondary) max-w-2xl mx-auto">
            © 2025 Prisma Data, Inc.
          </p>
        </div>
      </footer>
    </main>
  );
}
