"use client";

import {
  Switch as HeroSwitch,
  SwitchProps as HeroSwitchProps,
} from "@heroui/react";

export type SwitchProps = HeroSwitchProps;

export function Switch(props: SwitchProps) {
  return <HeroSwitch {...props} />;
}
