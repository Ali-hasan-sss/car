import { Language, User } from "@/Types/adminTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  authToken: string | null;
  user: User | null;
  lang: string;
  isLoggedIn: boolean;
}

// استرجاع البيانات من Cookies
const tokenFromCookies = Cookies.get("authToken") || null;

let parsedUser: User | null = null;

if (typeof window !== "undefined") {
  const userFromStorage = localStorage.getItem("user");
  parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
}
const isClient = typeof window !== "undefined";
const storedLanguage = isClient ? localStorage.getItem("language") : null;
const initialLang: Language = storedLanguage === "ar" ? "ar" : "en";

const initialState: AuthState = {
  authToken: tokenFromCookies,
  user: parsedUser,
  lang: initialLang,
  isLoggedIn: !!tokenFromCookies && !!parsedUser,
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
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.lang = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("language", action.payload);
      }
    },
    setLogin(state, action: PayloadAction<{ token: string; user: User }>) {
      state.isLoggedIn = true;
      state.authToken = action.payload.token;
      state.user = action.payload.user;

      Cookies.set("authToken", action.payload.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // حفظ المستخدم في localStorag
      }
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.authToken = null;
      state.user = null;

      Cookies.remove("authToken");
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setAuthToken, setUser, setLanguage, setLogin, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
