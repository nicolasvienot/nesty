"use client";

import { useState } from "react";
import Link from "next/link";
import { useProjects, useDeleteProject } from "@/hooks/useProjects";
import { useAuthContext } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { DeleteProjectModal } from "@/components/projects/DeleteProjectModal";
import { Project } from "@/types/project";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { data: projects, isLoading } = useProjects();
  const deleteProject = useDeleteProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-background p-8">
        <div className="absolute top-4 right-4 flex gap-2">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600/10 border border-blue-600/20 rounded-md 
            hover:bg-blue-600/20 hover:border-blue-600/30 
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Home
          </Link>
          <LogoutButton />
        </div>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome {user?.name}!
              </h2>
              <div className="space-y-2">
                <p className="text-foreground/60">
                  This is a protected page. You can only see this if you&apos;re
                  logged in.
                </p>
                <p className="text-foreground/60">Email: {user?.email}</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Your projects</h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md 
                           hover:bg-blue-700 transition-colors"
                >
                  Create project
                </button>
              </div>
              {isLoading ? (
                <div className="text-foreground/60">Loading projects...</div>
              ) : (
                <>
                  {projects?.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                      <p className="text-foreground/60">
                        You don&apos;t have any projects yet.
                      </p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md 
                        hover:bg-blue-700 transition-colors duration-200 ease-in-out"
                      >
                        Create your first project
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {projects?.map((project) => (
                        <div
                          key={project.id}
                          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                          <h3 className="text-xl font-semibold mb-2">
                            {project.name}
                          </h3>
                          <p className="text-foreground/60">
                            {project.repository}
                          </p>
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={() => {
                                setProjectToDelete(project);
                                setDeleteModalOpen(true);
                              }}
                              className="px-4 py-2 text-sm font-medium text-white bg-red-500/80 rounded-md 
                              hover:bg-red-600/90 transition-colors duration-200 ease-in-out"
                            >
                              Remove project
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <DeleteProjectModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setProjectToDelete(null);
        }}
        project={projectToDelete}
        onConfirm={() => {
          if (projectToDelete) {
            deleteProject.mutate(projectToDelete.id);
          }
        }}
      />
    </PrivateRoute>
  );
}
