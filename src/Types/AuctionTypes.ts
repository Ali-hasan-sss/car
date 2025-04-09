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

export interface Auction {
  id: number;
  auction_link: string | null;
  category: Category;
  year: string;
  transmission_type: number;
  drive_system: number;
  fuel_type: number;
  cylinders: number;
  from_budget: string;
  to_budget: string;
  shipping_option: number;
  ex_color: string;
  in_color: string;
  country: Country;
  user: User;
  status: number | null;
  created_at: string;
  updated_at: string;
}

export interface AuctionsFormInputs {
  auction_link: string;
  manufacturer: number | null;
  category_id: number | null;
  year: string;
  transmission_type: number;
  drive_system: number;
  fuel_type: number;
  cylinders: number;
  from_budget: string;
  country_id: number | null;
  to_budget: string;
  shipping_option: number;
  car_status: string;
  ex_color: string;
  in_color: string;
  shipping_from: string;
  id?: number; // لإجراء التعديل نحتاج الـ id
}
//واجهة المبيعات
interface ImageData {
  id: number;
  image: string;
}

export interface CarSale {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
    contact: {
      mobile: string;
      address1: string;
      city: string;
    };
  };
  category: {
    id: number;
    title: string;
    manufacturer: {
      id: number;
      title: string;
    };
  };
  cmodel: {
    id: number;
    title: string;
  };
  year: string;
  mileage: number;
  drive_system: number;
  transmission_type: number;
  cylinders: number;
  fuel_type: number;
  price: string;
  ex_color: string;
  in_color: string;
  shipping_from: number | null;
  car_status: number;
  status: number;
  location_of_car?: string | null;
  car_fax?: string | null;
  images: ImageData[];
  created_at: string;
  updated_at: string;
}

export interface SallesFormInputs {
  manufacturer: number | null;
  cmodel_id: number | null;
  category_id: number | null;
  mileage: number;
  year: string;
  drive_system: number;
  transmission_type: number;
  cylinders: number;
  fuel_type: number;
  price: string;
  shipping_from: number | null;
  car_status: number;
  ex_color: string;
  in_color: string;
  id?: number;
  status?: number;
  images: string[];
  not_shippedlocations: string;
  shipping_status: number;
  carfax: number | null;
  location_port: string;
}
