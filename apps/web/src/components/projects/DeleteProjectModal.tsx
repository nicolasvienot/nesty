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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Delete project</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete {project?.name}? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                     bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 
                     dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 
                     rounded-md hover:bg-red-600 transition-colors"
          >
            Delete project
          </button>
        </div>
      </div>
    </div>
  );
}
