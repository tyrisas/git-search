import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Project } from './projects/project.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FetchResponse } from './fetchResponse.model';



@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private http: HttpClient) { }

  fetchProjects(keyWords: string): Observable<Project[]> {
    if (keyWords) {
      const link = `https://api.github.com/search/repositories?q=${keyWords} in:name`
      return this.http.get<FetchResponse>(link).pipe(
        map(responseData => {
          const projects: Project[] = [];
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
            projects.push(project);
          }
          return projects;
        })
      )
    } else {
      return of([]);
    }
  };
}

