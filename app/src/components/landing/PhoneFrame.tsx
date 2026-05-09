import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** iPhone-style mockup frame for vertical video posters. */
export default function PhoneFrame({ children, className = "" }: Props) {
  return (
    <div className={`phone-frame ${className}`}>
      <span className="phone-side-btn" aria-hidden />
      <div className="phone-screen">{children}</div>
    </div>
  );
}
