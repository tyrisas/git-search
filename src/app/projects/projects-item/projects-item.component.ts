import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Component, Input } from '@angular/core';

import { ProjectEssentials } from './../../../models/projectEssentials.model';

@Component({
  selector: 'app-projects-item',
  templateUrl: './projects-item.component.html',
  styleUrls: ['./projects-item.component.css']
})
export class ProjectsItemComponent {
  @Input() project!: ProjectEssentials;
  @Input() starIcon!: IconDefinition;
  @Input() arrowIcon!: IconDefinition;
}
