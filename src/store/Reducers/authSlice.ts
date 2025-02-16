// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  authToken: string | null;
  lang: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  authToken: null,
  lang: "en",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken(state, action: PayloadAction<string>) {
      state.authToken = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
    setLogin(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.authToken = action.payload;
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.authToken = null;
    },
  },
});

export const { setAuthToken, setLanguage, setLogin, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
