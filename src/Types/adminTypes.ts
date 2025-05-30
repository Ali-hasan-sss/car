// adminTypes.ts

export interface Admin {
  id: number;
  name?: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active?: number;
  userRole?: string;
  password?: string;
}
export type Language = "en" | "ar";
// واجهة لبيانات الاتصال
export interface Contact {
  id: number;
  mobile: string;
  country_id: number;
  language: string;
  address1: string;
  address2?: string | null;
  city: string;
  zip_code: string;
  other_mobile?: string | null;
  created_at: string;
  updated_at: string;
}

// واجهة لتفاصيل الهوية
export interface IdDetail {
  id: number;
  type: number;
  id_number: string;
  id_file: string;
  cr_certificate?: string | null;
  tax_info?: string | null;
  created_at: string;
  updated_at: string;
}

// واجهة المستخدم الرئيسية
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  type: number | string;
  is_active?: number;
  is_full_data?: boolean;
  IsVerified?: boolean;
  userRole?: string;
  password?: string;
  contact?: Contact | null;
  idDetail?: IdDetail | null;
  created_at?: string;
}
export type initialData = {
  email: string;
  type: number;
  name: string;
  user_id: string;
  mobile: string;
  other_mobile: string;
  country_id: number | null;
  language: string;
  address1: string;
  address2: string;
  city: string;
  zip_code: string;
  id_number: string;
  id_file: string;
  tax_info: string;
  cr_certificate: string;
};
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
export interface TableRow {
  id: number;
  [key: string]: string | number;
}

export interface AuthState {
  authToken: string | null;
  lang: string;
}
export interface ServiceBlogFormProps {
  formData: {
    title: { en: string; ar: string };
    body: { en: string; ar: string };
    description: { en: string; ar: string };
    image: string;
    images: string[];
  };
  onChange: (updatedData: ServiceBlogFormProps["formData"]) => void;
  handleSubmit: () => void;
  isNew: boolean;
  loading: boolean;
  onClose: () => void;
}

export interface Blog {
  id: number;
  title: string | { en: string; ar: string };
  description: string | { en: string; ar: string };
  body: string | { en: string; ar: string };
  image: string;
  images?: string[];
  ondelete?: () => void;
  onedit?: () => void;
}
export interface blogImages {
  id: number;
  image: string;
  blog_id: number;
}
export interface BlogUser {
  id: number;
  title: string;
  description: string;
  body: string;
  image: string;
  images?: blogImages[];
  slug: string;
  created_at: string;
  updated_at: string;
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
  images?: string[];
  description: { en: string; ar: string };
  ondelete?: () => void;
  onedit?: () => void;
}
export interface ServiceUser {
  id: number;
  title: string;
  body: string;
  image: string;
  images?: string[];
  description: string;
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
export interface Country {
  id: number;
  title: string;
  code: string;
}
export interface manufacturers {
  id: number;
  title: string;
  manufacturer_id: number | null;
}
export interface Manufacturer {
  id: number;
  title: string;
}
export interface category {
  id: number;
  title: string;
  category_id?: number | null;
}

export interface CountriesState {
  countriesList: Country[];
  selectedCountry: Country | null;
  lastUpdated: number;
}

export interface Port {
  id: number;
  title: string;
  type: number;
}

export interface PortState {
  portsList: Port[];
  selectedPort: Port | null;
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
