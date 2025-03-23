interface Manufacturer {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  title: string;
  manufacturer: Manufacturer;
  created_at: string;
  updated_at: string;
}

interface Country {
  id: number;
  title: string;
  code: string;
  created_at: string;
  updated_at: string;
}

interface Contact {
  id: number;
  mobile: string;
  country_id: number;
  language: string;
  address1: string;
  address2: string | null;
  city: string;
  zip_code: string;
  other_mobile: string | null;
  created_at: string;
  updated_at: string;
}

interface IdDetail {
  id: number;
  type: number;
  id_number: string;
  id_file: string;
  cr_certificate: string | null;
  tax_info: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
  type: number;
  email: string;
  contact: Contact;
  idDetail: IdDetail;
  is_full_data: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  auction_link: string | null;
  category: Category;
  year: number;
  transmission_type: number;
  drive_system: number;
  fuel_type: number;
  cylinders: number;
  from_budget: number;
  to_budget: number;
  shipping_option: number;
  ex_color: string;
  in_color: string;
  country: Country;
  user: User;
  status: number;
  created_at: string;
  updated_at: string;
}
