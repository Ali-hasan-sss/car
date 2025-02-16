// socialMediaTypes.ts
export interface SocialMedia {
  id: number;
  icon: string;
  link: string;
}

export interface SocialMediaState {
  socialMediaList: SocialMedia[];
  selectedSocialMedia: SocialMedia | null;
}

export type SocialMediaAction =
  | { type: "FETCH_SOCIAL_MEDIA_SUCCESS"; payload: SocialMedia[] }
  | { type: "SELECT_SOCIAL_MEDIA"; payload: SocialMedia };
