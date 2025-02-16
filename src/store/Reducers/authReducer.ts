// authReducer.ts
import { AuthState, AuthAction } from "./../../Types/authTypes";

const initialState: AuthState = {
  authToken: null,
  lang: "en",
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_AUTH_TOKEN":
      return { ...state, authToken: action.payload };
    case "SET_LANGUAGE":
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};

export default authReducer;
