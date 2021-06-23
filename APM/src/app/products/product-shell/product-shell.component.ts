import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Product } from '../product';
import { State, getShowProductCode, getCurrentProduct, getProducts, getError } from '../state';
import { ProductPageActions } from "../state/actions";
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-shell.component.html'
})

export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(
    private store: Store<State>,  
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
    this.errorMessage$ = this.store.select(getError);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
  }
}
