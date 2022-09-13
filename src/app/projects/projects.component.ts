import { Project } from './project.model';
import { ProjectsData } from '../projectsData.model';
import { Observable, Subscription } from 'rxjs';
import { ProjectService } from './../project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  private getProjectSubscription!: Subscription
  projects: Project[] = [];
  timeout: any = null;
  keywords: string = "";
  page: number = 1;
  total: number = 0
  loading: boolean = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  ngOnDestroy(): void {
    this.getProjectSubscription.unsubscribe();
  }

  onSearch(event: Event): void {
    this.keywords = ((<HTMLInputElement>event.target).value).trim();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.getProjectSubscription = this.subscibeToGetProjects();
    }, 500);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loading = true;
    this.getProjectSubscription = this.subscibeToGetProjects();
  }

  subscibeToGetProjects(): Subscription {
    return this.getProjects().subscribe(res => {
      this.projects = res.projects
      this.total = res.totalCount;
      this.loading = false;
      this.page = res.page
    });
  }

  getProjects(): Observable<ProjectsData> {
    return this.projectService.fetchProjects(this.keywords, this.page);
  }
}
