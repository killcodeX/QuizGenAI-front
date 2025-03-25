"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NextJs from "./icons/next.svg";
import Express from "./icons/express.svg";
import Node from "./icons/node.svg";
import OpenAI from "./icons/openAi.svg";
import PostGreSql from "./icons/postgreSql.svg";

export const Marquee = () => {
  const marq = useRef<HTMLDivElement>(null);
  const animationSpeed = 1;
  const cardWidth = 150;
  const [cards, setCards] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (marq.current) {
      // Convert children to array and set initial positions
      const initialCards = Array.from(marq.current.children) as HTMLElement[];

      initialCards.forEach((card, index) => {
        card.style.left = `${index * cardWidth}px`;
      });

      setCards(initialCards);

      const animate = () => {
        initialCards.forEach((card) => {
          // Get current position
          let currentLeft = parseFloat(card.style.left || "0");

          // Move right by animation speed
          currentLeft += animationSpeed;

          // If card has moved completely off-screen to the right
          if (currentLeft > window.innerWidth) {
            // Find the leftmost card's position
            let minLeft = Math.min(
              ...initialCards.map((c) => parseFloat(c.style.left || "0"))
            );
            // Place this card to the left of the leftmost card
            currentLeft = minLeft - cardWidth;
          }

          // Apply the new position
          card.style.left = `${currentLeft}px`;
        });

        // Continue animation
        requestAnimationFrame(animate);
      };

      // Start animation
      const animationFrame = requestAnimationFrame(animate);

      // Cleanup function
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, []);

  return (
    <div className="absolute bottom-[50px] w-full flex justify-center">
      <div
        className="marquee-container max-w-500 relative overflow-hidden h-[50px] w-full flex justify-center align-center gap-8"
        ref={marq}
      >
        <div className="marquee-item absolute flex justify-center w-[150px]">
          <Image
            priority
            src={NextJs}
            width={50}
            height={50}
            alt="Follow us on Twitter"
          />
        </div>
        <div className="marquee-item absolute flex justify-center w-[150px]">
          <Image
            priority
            src={Express}
            width={50}
            height={50}
            alt="Follow us on Twitter"
          />
        </div>
        <div className="marquee-item absolute flex justify-center w-[150px]">
          <Image
            priority
            src={Node}
            width={50}
            height={50}
            alt="Follow us on Twitter"
          />
        </div>

        <div className="marquee-item absolute flex justify-center w-[150px]">
          <Image
            priority
            src={OpenAI}
            width={50}
            height={50}
            alt="Follow us on Twitter"
          />
        </div>

        <div className="marquee-item absolute flex justify-center w-[150px]">
          <Image
            priority
            src={PostGreSql}
            width={50}
            height={50}
            alt="Follow us on Twitter"
          />
        </div>
        <div className="marquee-item absolute flex justify-center w-[150px]">
          <Image
            priority
            src={NextJs}
            width={50}
            height={50}
            alt="Follow us on Twitter"
          />
        </div>
        <div className="marquee-item absolute flex justify-center w-[150px]">
          <Image
            priority
            src={Express}
            width={50}
            height={50}
            alt="Follow us on Twitter"
          />
        </div>
        <div className="marquee-item absolute flex justify-center w-[150px]">
          <Image
            priority
            src={Node}
            width={50}
            height={50}
            alt="Follow us on Twitter"
          />
        </div>

        <div className="marquee-item absolute flex justify-center w-[150px]">
          <Image
            priority
            src={OpenAI}
            width={50}
            height={50}
            alt="Follow us on Twitter"
          />
        </div>

        <div className="marquee-item absolute flex justify-center w-[150px]">
          <Image
            priority
            src={PostGreSql}
            width={50}
            height={50}
            alt="Follow us on Twitter"
          />
        </div>
      </div>
    </div>
  );
};
