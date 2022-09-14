import { Component, OnInit } from '@angular/core';

import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: boolean = false;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getLoadingState();
  }

  getLoadingState() {
    this.loadingService.loading$.subscribe(loadingState => {
      this.loading = loadingState;
    })
  }
}
