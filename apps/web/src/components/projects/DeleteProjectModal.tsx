"use client";

import { Project } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onConfirm: () => void;
}

export function DeleteProjectModal({
  isOpen,
  onClose,
  project,
  onConfirm,
}: DeleteProjectModalProps) {
  const handleDelete = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const footer = (
    <>
      <Button variant="light" color="default" onPress={onClose}>
        Cancel
      </Button>
      <Button color="danger" onPress={handleDelete}>
        Delete project
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      title="Delete project"
      footer={footer}
    >
      <p className="text-muted-foreground">
        Are you sure you want to delete {project?.name}? This action cannot be
        undone.
      </p>
    </Modal>
  );
}
