import { createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import { ProductPageActions, ProductApiActions } from "./actions"

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

  on(ProductPageActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    }
  }),

  on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId
    }
  }),

  on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null
    }
  }),

  on(ProductPageActions.initCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0
    }
  }),

  // Create
  on(ProductApiActions.createProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.product.id,
      error: '',
      products: [...state.products, action.product]
    }
  }),

  on(ProductApiActions.createProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),

  // Read
  on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    }
  }),

  on(ProductApiActions.loadProductsFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),

  // Update
  on(ProductApiActions.updateProductSuccess, (state, action): ProductState => {
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

  on(ProductApiActions.updateProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),

  // Delete
  on(ProductApiActions.deleteProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      error: '',
      currentProductId: null,
      products: state.products.filter(product => product.id !== action.productId)
    }
  }),

  on(ProductApiActions.deleteProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),

);