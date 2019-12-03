import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, getAppState } from './app.selectors';
import { State } from './core/store';
import { ProductService } from './shared/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public state: Observable<AppState>;

  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.state = this.store.select(getAppState);
    this.productService.fetchProducts();
  }
}
