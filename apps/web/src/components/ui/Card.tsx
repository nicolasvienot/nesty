"use client";

import {
  Card as HeroCard,
  CardProps as HeroCardProps,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/react";

type CardProps = HeroCardProps & {
  title?: React.ReactNode;
  footer?: React.ReactNode;
};

export function Card({
  children,
  className,
  title,
  footer,
  radius = "sm",
  shadow = "sm",
  ...props
}: CardProps) {
  return (
    <HeroCard radius={radius} shadow={shadow} className={className} {...props}>
      {title && <CardHeader className="text-lg">{title}</CardHeader>}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </HeroCard>
  );
}

export { CardHeader, CardBody, CardFooter };
