import { ProjectEssentials } from './projectEssentials.model';

export interface ProjectsData {
  projects: ProjectEssentials[],
  totalCount: number,
  page: number,
}
