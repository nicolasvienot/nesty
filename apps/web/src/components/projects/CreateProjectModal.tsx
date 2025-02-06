"use client";

import { useState } from "react";
import { useCreateProject } from "@/hooks/useProjects";

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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProject.mutateAsync({ name, repository });
    setName("");
    setRepository("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Create new project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Project name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700"
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
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
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
              type="submit"
              disabled={createProject.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                       rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {createProject.isPending ? "Creating..." : "Create project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
