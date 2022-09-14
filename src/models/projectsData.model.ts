import { Project } from './project.model';

export interface ProjectsData {
  projects: Project[],
  totalCount: number,
  page: number,
}
