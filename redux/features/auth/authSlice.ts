import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  user: string;
}

const inititalState: AuthState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: inititalState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: string }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
