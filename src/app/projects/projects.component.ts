import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass, faStar, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';

import { LoadingService } from './../services/loading/loading.service';
import { Project } from '../../models/project.model';
import { ProjectsData } from '../../models/projectsData.model';
import { ProjectService } from '../services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  private getProjectSubscription!: Subscription

  faMagnifyingGlass = faMagnifyingGlass;
  faStar = faStar;
  faArrowTurnDown = faArrowTurnDown;

  projects: Project[] = [];
  timeout: any = null;
  keywords: string = "";
  page: number = 1;
  total: number = 0
  loading: boolean = false;

  constructor(private projectService: ProjectService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getProjects();
    this.getLoadingState();
  }

  ngOnDestroy(): void {
    this.getProjectSubscription.unsubscribe();
  }

  onSearch(keywords: string): void {
    this.keywords = keywords;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getProjectSubscription = this.subscibeToGetProjects();
    }, 500);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.getProjectSubscription = this.subscibeToGetProjects();
  }

  subscibeToGetProjects(): Subscription {
    return this.getProjects().subscribe(res => {
      this.projects = res.projects
      this.total = res.totalCount;
      this.page = res.page
    });
  }

  getProjects(): Observable<ProjectsData> {
    return this.projectService.fetchProjects(this.keywords, this.page);
  }

  getLoadingState() {
    this.loadingService.loading$.subscribe(loadingState => {
      this.loading = loadingState;
    })
  }
}
