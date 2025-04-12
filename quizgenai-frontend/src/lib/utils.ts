import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUniqueRGBAColors = (count: number) => {
  const colors = [];
  const generatedColors = new Set(); // To ensure uniqueness

  function generateRandomRGBA() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random() * (0.8 - 0.6) + 0.6; // Alpha between 0.6 and 0.8

    const rgba = `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
    return rgba;
  }

  while (colors.length < count) {
    let newColor = generateRandomRGBA();
    if (!generatedColors.has(newColor)) {
      colors.push(newColor);
      generatedColors.add(newColor);
    }
  }

  return colors;
};
