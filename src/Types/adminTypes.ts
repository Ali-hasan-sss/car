// adminTypes.ts

export interface Admin {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  is_active?: boolean;
}

export interface UpdatedProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AdminsState {
  adminsList: Admin[];
  selectedAdmin: Admin | null;
}
export interface Column {
  id: string;
  label: string;
  type?: "image" | "text";
  languageDisplay?: "both" | "en" | "ar";
}
export interface AuthState {
  authToken: string | null;
  lang: string;
}
export interface Blog {
  id: number;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
  image: string;
  description: { en: string; ar: string };
  ondelete?: () => void;
  onedit?: () => void;
}

export interface BlogsState {
  blogsList: Blog[];
  selectedBlog: Blog | null;
  lastUpdated: number;
}

export interface Service {
  id: number;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
  image: string;
  description: { en: string; ar: string };
  ondelete?: () => void;
  onedit?: () => void;
}

export interface ServicesState {
  servicesList: Service[];
  selectedService: Service | null;
  lastUpdated: number;
}

export interface SocialMedia {
  id: number;
  icon: string;
  link: string;
}

export interface SocialMediaState {
  socialMediaList: SocialMedia[];
  selectedSocialMedia: SocialMedia | null;
  lastUpdated: number;
}

export type AdminAction =
  | { type: "FETCH_ADMINS_SUCCESS"; payload: Admin[] }
  | { type: "SELECT_ADMIN"; payload: Admin };

export type AuthAction =
  | { type: "SET_AUTH_TOKEN"; payload: string }
  | { type: "SET_LANGUAGE"; payload: string };

export type BlogAction =
  | { type: "FETCH_BLOGS_SUCCESS"; payload: Blog[] }
  | { type: "SELECT_BLOG"; payload: Blog };

export type ServiceAction =
  | { type: "FETCH_SERVICES_SUCCESS"; payload: Service[] }
  | { type: "SELECT_SERVICE"; payload: Service };

export type SocialMediaAction =
  | { type: "FETCH_SOCIAL_MEDIA_SUCCESS"; payload: SocialMedia[] }
  | { type: "SELECT_SOCIAL_MEDIA"; payload: SocialMedia };
