import { User } from "@/Types/adminTypes";
import { Language } from "@/utils/languages";
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

// التحقق من أن الكود يعمل في المتصفح قبل استخدام localStorage
if (typeof window !== "undefined") {
  const userFromStorage = localStorage.getItem("user");
  parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
}
const isClient = typeof window !== "undefined"; // ✅ التحقق من بيئة المتصفح
const storedLanguage = isClient ? localStorage.getItem("language") : null;
const initialLang: Language = storedLanguage === "ar" ? "ar" : "en";

const initialState: AuthState = {
  authToken: tokenFromCookies,
  user: parsedUser, // تحميل بيانات المستخدم من localStorage
  lang: initialLang,
  isLoggedIn: !!tokenFromCookies && !!parsedUser, // التأكد من أن المستخدم مسجل دخول
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
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // حفظ المستخدم في localStorage
      }
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.authToken = null;
      state.user = null;

      Cookies.remove("authToken");
      if (typeof window !== "undefined") {
        localStorage.removeItem("user"); // حذف بيانات المستخدم من localStorage
      }
    },
  },
});

export const { setAuthToken, setUser, setLanguage, setLogin, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
