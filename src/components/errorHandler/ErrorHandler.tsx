"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void; // doesn't work https://github.com/vercel/next.js/discussions/49935
};

export default function ErrorHandler({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-16">
      <h2 className="text-zinc-800 text-6xl text-center font-extrabold mt-16">
        Something went wrong!
      </h2>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Try again
      </Button>
    </div>
  );
}
