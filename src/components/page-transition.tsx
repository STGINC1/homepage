import { ViewTransition, type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

/** Fades and lifts page content during client-side navigation. */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
