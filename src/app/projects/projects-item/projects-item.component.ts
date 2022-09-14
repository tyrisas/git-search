import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Project } from '../../../models/project.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-item',
  templateUrl: './projects-item.component.html',
  styleUrls: ['./projects-item.component.css']
})
export class ProjectsItemComponent implements OnInit {
  @Input() project!: Project;
  @Input() starIcon!: IconDefinition;
  @Input() arrowIcon!: IconDefinition;


  constructor() { }

  ngOnInit(): void {
  }

}
