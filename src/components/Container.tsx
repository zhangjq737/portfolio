import type { ReactNode } from "react";

// Centers content and constrains width. Reused on every page for consistent gutters.
export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-6">{children}</div>;
}
