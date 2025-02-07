export type Project = {
  id: string;
  name: string;
  repository: string;
};

export type CreateProject = {
  name: string;
  repository: string;
};

export type UpdateProject = Partial<CreateProject>;
