"use client";

import {
  Modal as HeroModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps as HeroModalProps,
} from "@heroui/react";

interface ModalProps extends HeroModalProps {
  title?: string;
  footer?: React.ReactNode;
}

export function Modal({ title, children, footer, ...props }: ModalProps) {
  return (
    <HeroModal
      {...props}
      radius="sm"
      shadow="sm"
      backdrop="blur"
      scrollBehavior="inside"
      disableAnimation
      classNames={{
        closeButton: "hover:bg-transparent active:bg-transparent mt-1 mr-1",
      }}
    >
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </HeroModal>
  );
}

export { ModalHeader, ModalBody, ModalFooter };
