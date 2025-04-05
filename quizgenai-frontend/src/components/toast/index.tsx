"use client";

import { toast } from "sonner";

export default function SonnerDemo() {
  return toast("Event has been created", {
    description: "Sunday, December 03, 2023 at 9:00 AM",
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  });
}
