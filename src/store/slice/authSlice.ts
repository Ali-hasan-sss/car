import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  authToken: string | null;
  lang: string;
  isLoggedIn: boolean;
}

const tokenFromCookies = Cookies.get("authToken") || null;

const initialState: AuthState = {
  authToken: tokenFromCookies,
  lang: "en",
  isLoggedIn: !!tokenFromCookies,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken(state, action: PayloadAction<string>) {
      state.authToken = action.payload;
      Cookies.set("authToken", action.payload, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
    setLogin(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.authToken = action.payload;
      Cookies.set("authToken", action.payload, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.authToken = null;
      Cookies.remove("authToken");
    },
  },
});

export const { setAuthToken, setLanguage, setLogin, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
