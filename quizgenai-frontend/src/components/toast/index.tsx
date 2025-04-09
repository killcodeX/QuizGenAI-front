"use client";

import { toast } from "sonner";

// Convert this to a function that can be called directly instead of a component
export function showErrorToast(message: string) {
  toast.error("An error occurred", {
    description: message || "Please try again later",
    action: {
      label: "Retry",
      onClick: () => window.location.reload(),
    },
  });
}

// Keep the component for backward compatibility if needed
export default function ErrorHandler({ message }: { message: string }) {
  // Call the function directly without useEffect
  if (message) {
    // Use setTimeout to ensure it runs after render and only once
    setTimeout(() => {
      showErrorToast(message);
    }, 0);
  }

  return null;
}
