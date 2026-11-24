import type { ReactNode } from "react";

export default function SectionHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="sec-head">
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
