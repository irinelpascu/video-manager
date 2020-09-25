import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {
  combineLatest,
  Observable
} from 'rxjs';
import {
  select,
  Store
} from '@ngrx/store';
import { VideosModuleState } from '../store/reducers';
import {
  getAuthors,
  getCategories
} from '../store/selectors';
import {
  filter,
  map,
  tap
} from 'rxjs/operators';
import {
  Author,
  Category
} from '../store/models';
import {
  GetAuthors,
  GetCategories
} from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class LoadDataGuard implements CanActivate {

  constructor(private store$: Store<VideosModuleState>) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return combineLatest([
      this.store$.pipe(select(getAuthors)),
      this.store$.pipe(select(getCategories)),
    ])
      .pipe(
        tap(([authors, categories]: [Author[], Category[]]) => {
          if (!authors && !categories) {
            this.store$.dispatch(new GetCategories());
            this.store$.dispatch(new GetAuthors());
          }
        }),
        map(([authors, categories]: [Author[], Category[]]) => !!authors && !!categories),
        filter(dataAvailable => !!dataAvailable)
      );
  }

}
