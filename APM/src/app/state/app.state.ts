import { ProductState } from "../products/state/product.reducer";

export interface AppState {
  products: ProductState;
  users: any;
}