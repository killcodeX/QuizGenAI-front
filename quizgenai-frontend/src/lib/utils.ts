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

export const validateFullName = (fullName: string) => {
  if (!fullName) return "Full name is required";
  if (fullName.trim().length < 2)
    return "Full name must be at least 2 characters";
  if (!/^[a-zA-Z\s'-]+$/.test(fullName))
    return "Full name should only contain letters, spaces, hyphens and apostrophes";
  return "";
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};
