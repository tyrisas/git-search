import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../../models/project.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { faStar, faCodeFork } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  project$: Observable<Project> = of({
    name: "",
    stars: 0,
    forks: 0,
    owner: "",
    avatar: "",
    description: "",
    url: ""
  });

  faStar = faStar;
  faCodeFork = faCodeFork;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.project$ = this.getProject();
    this.project$.subscribe(d => console.log(d))
  }

  getProject(): Observable<Project> {
    const owner = this.route.snapshot.params['owner'];
    const project = this.route.snapshot.params['project'];

    return this.projectService.fetchProject(owner, project);
  }

}
