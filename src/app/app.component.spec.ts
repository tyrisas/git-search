import { LoadingService } from './services/loading/loading.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

let fixture: ComponentFixture<AppComponent>;
let app: AppComponent;
let mockLoadingService: any;

describe('AppComponent', () => {
  beforeEach(async () => {
    mockLoadingService = jasmine.createSpyObj(['setLoading'])

    await TestBed.configureTestingModule({
      providers: [[{
        provide: LoadingService,
        useValue: mockLoadingService
      }]],
      imports: [],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have a false loading state at the start', () => {
    expect(app.loading).toBeFalsy();
  });
});
