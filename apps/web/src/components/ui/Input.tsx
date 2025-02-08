"use client";

import { Input as HeroInput, InputProps } from "@heroui/react";

export function Input({
  className,
  label,
  color = "default",
  radius = "sm",
  variant = "bordered",
  size = "md",
  labelPlacement = "inside",
  ...props
}: InputProps) {
  return (
    <HeroInput
      className={className}
      label={label}
      color={color}
      radius={radius}
      variant={variant}
      size={size}
      labelPlacement={labelPlacement}
      {...props}
    />
  );
}
