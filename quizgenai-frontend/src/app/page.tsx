import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen bg-hero-custom flex justify-center items-center">
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
    </div>
  );
}
