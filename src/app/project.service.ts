import { ProjectFetchResponse } from './projectFetchResponse.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Project } from './projects/project.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectsFetchResponse } from './projectsFetchResponse.model';
import { ProjectsData } from './projectsData.model';



@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private http: HttpClient) { }

  fetchProjects(keyWords: string, page: number): Observable<ProjectsData> {
    if (keyWords) {
      const link = `https://api.github.com/search/repositories?q=${encodeURIComponent(keyWords)} in:name&page=${page}&per_page=10`
      return this.http.get<ProjectsFetchResponse>(link).pipe(
        map(responseData => {
          const projectsData: ProjectsData = {
            projects: [],
            totalCount: 0,
            page: page
          };

          for (const p of responseData.items) {
            const project: Project = {
              name: p.name,
              stars: p.stargazers_count,
              forks: p.forks_count,
              owner: p.owner.login,
              avatar: p.owner.avatar_url,
              description: p.description,
              url: p.description
            }
            projectsData.projects.push(project);
          }
          projectsData.totalCount = responseData.total_count > 1000 ? 1000 : responseData.total_count;
          return projectsData;
        })
      )
    } else {
      return of({
        projects: [],
        totalCount: 0,
        page: 1
      });
    }
  };

  // https://api.github.com/repos/tyrisas/git-search
  fetchProject(owner: string, projectName: string): Observable<Project> {
    const link = `https://api.github.com/repos/${owner}/${projectName}`;

    return this.http.get<ProjectFetchResponse>(link).pipe(
      map(fetchedProject => {
        const project: Project = {
          name: fetchedProject.name,
          stars: fetchedProject.stargazers_count,
          forks: fetchedProject.forks_count,
          owner: fetchedProject.owner.login,
          avatar: fetchedProject.owner.avatar_url,
          description: fetchedProject.description,
          url: fetchedProject.html_url
        };
        return project;
      }
      ));
  }
}
