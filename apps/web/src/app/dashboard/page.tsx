"use client";

import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useProjects, useDeleteProject } from "@/hooks/useProjects";
import { Header } from "@/components/header/Header";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { Button } from "@/components/ui/Button";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { DeleteProjectModal } from "@/components/projects/DeleteProjectModal";
import { Project } from "@/types";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { data: projects, isLoading } = useProjects({ enabled: !!user });
  const deleteProject = useDeleteProject();

  const createModal = useDisclosure();
  const deleteModal = useDisclosure();
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    deleteModal.onOpen();
  };

  const handleDeleteConfirm = async () => {
    if (projectToDelete) {
      await deleteProject.mutateAsync(projectToDelete.id);
      deleteModal.onClose();
      setProjectToDelete(null);
    }
  };

  return (
    <PrivateRoute>
      <Header />
      <div className="min-h-screen bg-background p-4 pt-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

          <div className="grid gap-6">
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome {user?.name}
              </h2>
              <div className="space-y-2">
                <p className="text-muted-foreground">Email: {user?.email}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Projects</h2>
              <div className="mb-6">
                <Button onPress={createModal.onOpen}>Create project</Button>
              </div>
              {isLoading ? (
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {projects?.length === 0 ? (
                    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                      <p className="text-muted-foreground">
                        You don&apos;t have any projects yet.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {projects?.map((project) => (
                        <div
                          key={project.id}
                          className="bg-card p-6 rounded-lg shadow-sm border border-border"
                        >
                          <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                            {project.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {project.repository}
                          </p>
                          <div className="mt-4 flex justify-end">
                            <Button
                              onPress={() => handleDeleteClick(project)}
                              variant="flat"
                              color="danger"
                            >
                              Remove project
                            </Button>
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
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      />
      <DeleteProjectModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        project={projectToDelete}
        onConfirm={handleDeleteConfirm}
      />
    </PrivateRoute>
  );
}
