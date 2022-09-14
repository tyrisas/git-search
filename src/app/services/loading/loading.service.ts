import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();

  get loading(): boolean {
    return this._loading.getValue();
  }

  private set loading(val: boolean) {
    this._loading.next(val);
  }

  setLoading(val: boolean) {
    this.loading = val;
  }
}
