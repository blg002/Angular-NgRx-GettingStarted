import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { Product } from "../product";
import * as ProductActions from "./product.actions";

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
)

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
)

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductID) => {
    if (currentProductID === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      }
    }
    return currentProductID ? state.products.find(p => p.id === currentProductID) : null
  }
)

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
)

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
)

export const productReducer = createReducer<ProductState>(
  initialState,

  on(ProductActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    }
  }),

  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId
    }
  }),

  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null
    }
  }),

  on(ProductActions.initCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0
    }
  }),

  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    }
  }),

  on(ProductActions.loadProductsFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),

);