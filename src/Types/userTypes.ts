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

export interface UserData {
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
