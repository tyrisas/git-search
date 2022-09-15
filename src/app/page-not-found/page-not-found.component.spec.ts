import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PageNotFoundComponent } from './page-not-found.component';

let component: PageNotFoundComponent;
let fixture: ComponentFixture<PageNotFoundComponent>;

describe('PageNotFoundComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title -Page not found-', () => {
    const titleElement: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;

    expect(titleElement.textContent).toContain('Page not found');
  });

  it('should have a -Go Back- button', () => {
    const titleElement: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(titleElement.textContent).toContain('Go Back');
  })


});


