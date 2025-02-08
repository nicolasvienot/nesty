"use client";

import { Button as HeroButton, ButtonProps } from "@heroui/react";

export function Button({
  children,
  className,
  variant = "solid",
  color = "primary",
  radius = "sm",
  ...props
}: ButtonProps) {
  return (
    <HeroButton
      variant={variant}
      color={color}
      radius={radius}
      className={className}
      {...props}
    >
      {children}
    </HeroButton>
  );
}
