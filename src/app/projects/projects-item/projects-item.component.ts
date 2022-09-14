import { Project } from '../../../models/project.model';
import { Component, Input, OnInit } from '@angular/core';
import { faStar, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-projects-item',
  templateUrl: './projects-item.component.html',
  styleUrls: ['./projects-item.component.css']
})
export class ProjectsItemComponent implements OnInit {
  @Input() project!: Project;

  faStar = faStar;
  faArrowTurnDown = faArrowTurnDown;

  constructor() { }

  ngOnInit(): void {
  }

}
