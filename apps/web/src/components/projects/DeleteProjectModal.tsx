"use client";

import { Project } from "@/types";

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
  if (!isOpen) return null;

  const handleDelete = async () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg w-full max-w-md border border-border shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
          Delete project
        </h2>
        <p className="text-muted-foreground mb-6">
          Are you sure you want to delete {project?.name}? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-muted text-muted-foreground
                     rounded-md hover:bg-muted/80 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500/90
                     rounded-md hover:bg-red-600 transition-colors"
          >
            Delete project
          </button>
        </div>
      </div>
    </div>
  );
}
