import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons';

import { ProjectsItemComponent } from './projects-item.component';

describe('ProjectsItemComponent', () => {
  let component: ProjectsItemComponent;
  let fixture: ComponentFixture<ProjectsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsItemComponent);
    component = fixture.componentInstance;

    component.arrowIcon = faMagnifyingGlass;
    component.starIcon = faStar;
    component.project = {
      name: 'ProjectName1',
      stars: 11,
      owner: 'OwnerName1',
    },

      fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should show the project name', () => {
    const prNameElement: HTMLElement = fixture.debugElement.query(By.css('.pr-name')).nativeElement;
    console.log(prNameElement);

    expect(prNameElement.textContent).toBe('ProjectName1');
  })

  it('should show the project stars', () => {
    const prStarsElement: HTMLElement = fixture.debugElement.query(By.css('.pr-stars')).nativeElement;

    expect(prStarsElement.textContent).toBe('11');
  })

  it('should have a -See details" button', () => {
    const buttonSpanElement: HTMLElement = fixture.debugElement.query(By.css('button span')).nativeElement;

    expect(buttonSpanElement.textContent).toBe('See details');
  })
});
