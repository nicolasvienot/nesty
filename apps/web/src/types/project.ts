export type Project = {
  id: string;
  name: string;
  repository: string;
};

export type CreateProjectRequest = {
  name: string;
  repository: string;
};
