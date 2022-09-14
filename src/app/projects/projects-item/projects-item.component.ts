import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Component, Input } from '@angular/core';

import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-projects-item',
  templateUrl: './projects-item.component.html',
  styleUrls: ['./projects-item.component.css']
})
export class ProjectsItemComponent {
  @Input() project!: Project;
  @Input() starIcon!: IconDefinition;
  @Input() arrowIcon!: IconDefinition;
}
