// socialMediaReducer.ts
import {
  SocialMediaState,
  SocialMediaAction,
} from "./../../Types/socialMediaTypes";

const initialState: SocialMediaState = {
  socialMediaList: [],
  selectedSocialMedia: null,
};

const socialMediaReducer = (
  state = initialState,
  action: SocialMediaAction
): SocialMediaState => {
  switch (action.type) {
    case "FETCH_SOCIAL_MEDIA_SUCCESS":
      return { ...state, socialMediaList: action.payload };
    case "SELECT_SOCIAL_MEDIA":
      return { ...state, selectedSocialMedia: action.payload };
    default:
      return state;
  }
};

export default socialMediaReducer;
