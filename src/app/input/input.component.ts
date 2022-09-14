import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() searchIcon!: IconDefinition;
  @Input() loading!: boolean;
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event): void {
    const keywords = ((<HTMLInputElement>event.target).value).trim();
    this.search.emit(keywords);
  }
}
