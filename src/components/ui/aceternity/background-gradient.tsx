"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientClassName?: string;
}

export const BackgroundGradient = ({
  className,
  gradientClassName,
  children,
  ...props
}: BackgroundGradientProps) => {
  return (
    <div
      className={cn(
        "relative p-[1px] bg-transparent rounded-lg overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500",
          gradientClassName
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
};