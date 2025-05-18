import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button className={`py-2 px-6 rounded-md text-center ${className}`} {...props}>
      {children}
    </button>
  );
};

export const LinkButton = ({ href, children, className = "", ...props }: LinkButtonProps) => {
  return (
    <Link href={href} className={`py-2 px-6 rounded-md cursor-pointer text-center ${className}`} {...props}>
      {children}
    </Link>
  );
};
