type ProjectArchivedEnum = "archive";
type ProjectActiveEnum = "active";

type ProjectStatus = ProjectArchivedEnum | ProjectActiveEnum;

type Project = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  techStack?: string[];
  image: string;
  link?: string;
  label?: string;
  status: ProjectStatus;
  slug: string;
  hidden?: boolean;
  featured?: boolean;
  secondaryLink?: string;
  secondaryLabel?: string;
  content: string;
  highlight?: string;
  category?: string;
}

export type {
  Project, ProjectStatus,
  ProjectActiveEnum, ProjectArchivedEnum
}
