import { LoadingService } from './../loading/loading.service';
import { ProjectFetchResponse } from '../../../models/projectFetchResponse.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Project } from '../../../models/project.model';
import { Observable, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ProjectsFetchResponse } from '../../../models/projectsFetchResponse.model';
import { ProjectsData } from '../../../models/projectsData.model';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  fetchProjects(keyWords: string, page: number): Observable<ProjectsData> {
    if (keyWords) {
      this.loadingService.setLoading(true)
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
        }), finalize(() => this.loadingService.setLoading(false))
      )
    } else {
      return of({
        projects: [],
        totalCount: 0,
        page: 1
      });
    }
  };

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
