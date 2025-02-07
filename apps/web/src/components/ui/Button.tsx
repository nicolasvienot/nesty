"use client";

import { Button as HeroButton } from "@heroui/react";
import { ButtonProps } from "@heroui/react";

export interface CustomButtonProps extends ButtonProps {
  // Add any additional custom props here
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
}

export function Button({
  children,
  className,
  variant = "solid",
  ...props
}: CustomButtonProps) {
  return (
    <HeroButton variant={variant} className={className} {...props}>
      {children}
    </HeroButton>
  );
}
