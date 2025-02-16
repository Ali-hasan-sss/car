// authActions.ts
import { AuthAction } from "./../../Types/authTypes";

export const setAuthToken = (token: string): AuthAction => ({
  type: "SET_AUTH_TOKEN",
  payload: token,
});

export const setLanguage = (lang: string): AuthAction => ({
  type: "SET_LANGUAGE",
  payload: lang,
});
