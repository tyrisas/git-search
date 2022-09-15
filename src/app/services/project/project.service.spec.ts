import { finalize } from 'rxjs/operators';
import { ProjectsData } from './../../../models/projectsData.model';
import { LoadingService } from './../loading/loading.service';
import { ProjectFetchResponse } from './../../../models/projectFetchResponse.model';
import { Project } from './../../../models/project.model';
import { ProjectsFetchResponse } from './../../../models/projectsFetchResponse.model';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let PROJECTSFETCHRESPONSE: ProjectsFetchResponse;
  let PROJECTSDATA: ProjectsData;

  let PROJECTFETCHRESPONSE: ProjectFetchResponse;
  let PROJECT: Project;

  let service: ProjectService;
  let httpTestingController: HttpTestingController;
  let mockLoadingService: any;

  beforeEach(() => {
    PROJECTSFETCHRESPONSE =
    {
      total_count: 3,
      items: [
        {
          name: 'ProjectName1',
          stargazers_count: 11,
          owner: {
            login: 'OwnerName1',
          }
        },
        {
          name: 'ProjectName2',
          stargazers_count: 22,
          owner: {
            login: 'OwnerName2',
          }
        },
        {
          name: 'ProjectName3',
          stargazers_count: 33,
          owner: {
            login: 'OwnerName3',
          }
        },
      ]
    }

    PROJECTSDATA = {
      projects: [
        {
          name: 'ProjectName1',
          stars: 11,
          owner: 'OwnerName1',
        },
        {
          name: 'ProjectName2',
          stars: 22,
          owner: 'OwnerName2',
        },
        {
          name: 'ProjectName3',
          stars: 33,
          owner: 'OwnerName3',
        }
      ],
      totalCount: 3,
      page: 1,
    }

    PROJECTFETCHRESPONSE =
    {
      name: 'ProjectName1',
      stargazers_count: 11,
      forks_count: 111,
      owner: {
        login: 'OwnerName1',
        avatar_url: 'https://owner1',
      },
      description: 'Description1',
      html_url: 'https://project1',
    };

    PROJECT = {
      name: 'ProjectName1',
      stars: 11,
      forks: 111,
      owner: 'OwnerName1',
      avatar: 'https://owner1',
      description: 'Description1',
      url: 'https://project1'
    }

    mockLoadingService = jasmine.createSpyObj(['setLoading'])

    TestBed.configureTestingModule({
      providers: [ProjectService, [{
        provide: LoadingService,
        useValue: mockLoadingService
      }]],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProjectService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchProjects()', () => {
    it('should return the right projects', (done: DoneFn) => {
      service.fetchProjects('ProjectName', 1).subscribe((data) => {
        expect(data).toEqual(PROJECTSDATA);
        done();
      })

      const request = httpTestingController.expectOne('https://api.github.com/search/repositories?q=ProjectName in:name&page=1&per_page=10');

      request.flush(PROJECTSFETCHRESPONSE);

      expect(request.request.method).toBe('GET');
    })

    it('should end with two setLoading() calls', (done: DoneFn) => {
      service.fetchProjects('ProjectName', 1)
        .pipe(
          finalize(() => {
            expect(mockLoadingService.setLoading).toHaveBeenCalledTimes(2);
          })
        ).subscribe({
          next: (data) => {
            expect(data).toEqual(PROJECTSDATA);
            done();
          }, complete: () => {
            expect(mockLoadingService.setLoading).toHaveBeenCalledTimes(1);
          }
        })

      const request = httpTestingController.expectOne('https://api.github.com/search/repositories?q=ProjectName in:name&page=1&per_page=10');
      request.flush(PROJECTSFETCHRESPONSE);
    })
  });

  describe('fetchProject()', () => {
    it('should return the right project', (done: DoneFn) => {
      service.fetchProject('OwnerName1', 'ProjectName1').subscribe((data) => {
        expect(data).toEqual(PROJECT);
        done();
      })

      const request = httpTestingController.expectOne(`https://api.github.com/repos/OwnerName1/ProjectName1`);

      request.flush(PROJECTFETCHRESPONSE);

      expect(request.request.method).toBe('GET');
    })
  })

  afterEach(() => {
    httpTestingController.verify();
  })
});
