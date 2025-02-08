"use client";

import {
  Modal as HeroModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps as HeroModalProps,
} from "@heroui/react";

type ModalProps = HeroModalProps & {
  title?: string;
  footer?: React.ReactNode;
};

export function Modal({ title, children, footer, ...props }: ModalProps) {
  return (
    <HeroModal
      {...props}
      radius="md"
      shadow="sm"
      backdrop="blur"
      placement="center"
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
