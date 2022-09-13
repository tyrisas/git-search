import { Project } from './projects/project.model';

export interface ProjectsData {
  projects: Project[],
  totalCount: number,
  page: number,
}
