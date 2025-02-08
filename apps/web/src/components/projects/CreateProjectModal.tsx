"use client";

import { useState } from "react";
import { useCreateProject } from "@/hooks/useProjects";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [repository, setRepository] = useState("");
  const createProject = useCreateProject();

  const handleSubmit = async () => {
    try {
      await createProject.mutateAsync({ name, repository });
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setRepository("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const footer = (
    <>
      <Button variant="light" color="default" onPress={handleClose}>
        Cancel
      </Button>
      <Button
        color="primary"
        onPress={handleSubmit}
        isLoading={createProject.isPending}
      >
        {createProject.isPending ? "Creating..." : "Create project"}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      title="Create new project"
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project name"
          placeholder="Enter project name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Repository URL"
          placeholder="Enter repository URL"
          id="repository"
          value={repository}
          onChange={(e) => setRepository(e.target.value)}
          required
        />
      </form>
    </Modal>
  );
}
