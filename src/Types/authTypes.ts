// authTypes.ts
export interface AuthState {
  authToken: string | null;
  lang: string;
}

export type AuthAction =
  | { type: "SET_AUTH_TOKEN"; payload: string }
  | { type: "SET_LANGUAGE"; payload: string };
