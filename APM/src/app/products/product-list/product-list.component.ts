import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Product } from '../product';
import { State, getShowProductCode, getCurrentProduct, getProducts, getError } from '../state/product.reducer';
import * as ProductActions from "../state/product.actions";
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;

  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(
    private store: Store<State>,  
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
    
    this.store.dispatch(ProductActions.loadProducts());
    
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);

    this.errorMessage$ = this.store.select(getError);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
