import clsx from "clsx";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPending?: boolean;
  children: React.ReactNode;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const Button = ({
  children,
  className = "",
  isPending = false,
  disabled = false,
  type = "button",
  ...props
}: ButtonProps) => {
  const isInactive = disabled || isPending;

  const buttonClass = clsx(
    "rounded-md py-2 px-6 text-center",
    isInactive && "opacity-60 cursor-not-allowed",
    className,
  );

  return (
    <button
      type={type}
      disabled={isInactive}
      aria-disabled={isInactive}
      className={buttonClass}
      {...props}
    >
      {isPending ? '처리 중...' : children ?? '확인'}
    </button>
  );
};

export const LinkButton = ({ href, children, className = "", ...props }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={`rounded-md py-2 px-6 text-center cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};
