"use client";

import { useState } from "react";
import { useCreateProject } from "@/hooks/useProjects";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

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
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1 text-card-foreground"
          >
            Project name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md border border-border bg-background text-foreground
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder:text-muted-foreground"
            required
          />
        </div>
        <div>
          <label
            htmlFor="repository"
            className="block text-sm font-medium mb-1"
          >
            Repository URL
          </label>
          <input
            type="text"
            id="repository"
            value={repository}
            onChange={(e) => setRepository(e.target.value)}
            className="w-full p-2 rounded-md border border-border bg-background text-foreground
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder:text-muted-foreground"
            required
          />
        </div>
      </form>
    </Modal>
  );
}
