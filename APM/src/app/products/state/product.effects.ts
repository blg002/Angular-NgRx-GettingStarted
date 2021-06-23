import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";
import { ProductApiActions, ProductPageActions } from "./actions"

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.createProduct),
      concatMap(action => this.productService.createProduct(action.product)
        .pipe(
          map(product => ProductApiActions.createProductSuccess({ product })),
          catchError(error => of(ProductApiActions.createProductFail({ error  })))
        )
      )
    )
  });

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(() => this.productService.getProducts()
        .pipe(
          map(products => ProductApiActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductApiActions.loadProductsFail({ error })))
        )
      )
    )
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      concatMap(action => this.productService.updateProduct(action.product)
        .pipe(
          map(product => ProductApiActions.updateProductSuccess({ product })),
          catchError(error => of(ProductApiActions.updateProductFail({ error })))
        )
      )
    )
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.deleteProduct),
      mergeMap(action => this.productService.deleteProduct(action.productId)
        .pipe(
          map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
          catchError(error => of(ProductApiActions.deleteProductFail({ error })))
        )
      )
    )
  });

}