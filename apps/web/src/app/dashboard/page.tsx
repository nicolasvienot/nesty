"use client";

import PrivateRoute from "@/components/auth/PrivateRoute";
import { LogoutButton } from "@/components/auth/LogoutButton";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { useProjects } from "@/hooks/useProjects";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { data: projects, isLoading } = useProjects();

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-background p-8">
        <div className="absolute top-4 right-4 flex gap-4">
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
              <h2 className="text-2xl font-semibold mb-4">Your projects</h2>
              {isLoading ? (
                <div className="text-foreground/60">Loading projects...</div>
              ) : (
                <>
                  {projects?.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                      <p className="text-foreground/60">
                        You don&apos;t have any projects yet.
                      </p>
                      <Link
                        href="/projects/new"
                        className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md 
                        hover:bg-blue-700 transition-colors duration-200 ease-in-out"
                      >
                        Create your first project
                      </Link>
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
                            <Link
                              href={`/projects/${project.id}`}
                              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md 
                              hover:bg-blue-700 transition-colors duration-200 ease-in-out"
                            >
                              View Project
                            </Link>
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
    </PrivateRoute>
  );
}
