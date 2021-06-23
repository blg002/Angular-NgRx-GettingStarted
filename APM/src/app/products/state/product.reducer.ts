import { createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import * as ProductActions from "./product.actions";

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

  // Create
  on(ProductActions.createProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.product.id,
      error: '',
      products: [...state.products, action.product]
    }
  }),

  on(ProductActions.createProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),

  // Read
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

  // Update
  on(ProductActions.updateProductSuccess, (state, action): ProductState => {
    const updatedProducts = state.products.map(item => {
      return item.id === action.product.id ? action.product : item
    });
    
    return {
      ...state,
      currentProductId: action.product.id,
      products: updatedProducts,
      error: ''
    }
  }),

  on(ProductActions.updateProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),

  // Delete
  on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      error: '',
      currentProductId: null,
      products: state.products.filter(product => product.id !== action.productId)
    }
  }),

  on(ProductActions.deleteProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),

);