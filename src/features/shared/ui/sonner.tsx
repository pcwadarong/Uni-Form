"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps, toast } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-surface)",
          "--normal-text": "var(--color-content)",
          "--normal-border": "var(--color-green-300)"
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
export { toast };
