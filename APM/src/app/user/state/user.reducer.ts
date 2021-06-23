import { createReducer, on } from "@ngrx/store";
import { User } from "../user";
import { UserPageActions } from "./actions";

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: false,
  currentUser: null,
}

export const userReducer = createReducer(
  initialState,
  on(UserPageActions.maskUserName, state => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);
