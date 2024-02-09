"use client";

import ErrorHandler, {
  ErrorProps,
} from "@/components/errorHandler/ErrorHandler";

export default function Error(props: ErrorProps) {
  return <ErrorHandler {...props} />;
}
