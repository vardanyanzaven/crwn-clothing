import { RootState } from "../store";
import { UserState } from "./user.reducer";
import { createSelector } from "reselect";

export const selectUserState = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector([selectUserState], (userState) => userState.currentUser);