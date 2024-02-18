"use client";

import { ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: ReactNode;
} & Omit<ButtonProps, "type">;

export function SubmitButton({ children, ...buttonProps }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      {...buttonProps}
      disabled={buttonProps.disabled || pending}
    >
      {children}
    </Button>
  );
}
