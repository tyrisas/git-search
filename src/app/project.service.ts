import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Project } from './projects/project.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FetchResponse } from './fetchResponse.model';
import { ProjectsData } from './projectsData.model';



@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private http: HttpClient) { }

  fetchProjects(keyWords: string, page: number): Observable<ProjectsData> {
    if (keyWords) {
      const link = `https://api.github.com/search/repositories?q=${encodeURIComponent(keyWords)} in:name&page=${page}&per_page=10`
      return this.http.get<FetchResponse>(link).pipe(
        map(responseData => {
          const projectsData: ProjectsData = {
            projects: [],
            totalCount: 0,
            page: page
          };

          for (const p of responseData.items) {
            const project: Project = {
              id: p.id,
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
}

