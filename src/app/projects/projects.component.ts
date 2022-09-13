import { Project } from './project.model';
import { Observable } from 'rxjs';
import { ProjectService } from './../project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]> = new Observable<Project[]>;
  timeout: any = null;
  keywordsInput: string = "";

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects$ = this.getProjects("");
  }

  onSearch(event: Event) {
    this.keywordsInput = ((<HTMLInputElement>event.target).value).trim();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.projects$ = this.getProjects(this.keywordsInput);
    }, 1000);
  }

  getProjects(keyWords: string = ""): Observable<Project[]> {
    return this.projectService.fetchProjects(keyWords);
  }
}
