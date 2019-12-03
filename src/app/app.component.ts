import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, getAppState } from './app.selectors';
import { State } from './core/store';
import { loadProducts } from './core/store/products/products.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public state: Observable<AppState>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.state = this.store.select(getAppState);
    this.store.dispatch(loadProducts());
  }
}
