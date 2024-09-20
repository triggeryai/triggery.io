// Aria-Docs/app/portfolio/layout.tsx
import { PropsWithChildren } from "react";

export default function PortfolioLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-start justify-center pt-8 pb-10 w-full mx-auto">
      {children}
    </div>
  );
}
