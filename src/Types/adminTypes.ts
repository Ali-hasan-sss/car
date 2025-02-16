// adminTypes.ts
export interface Admin {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  is_active?: boolean;
}

export interface AdminsState {
  adminsList: Admin[];
  selectedAdmin: Admin | null;
}

export type AdminAction =
  | { type: "FETCH_ADMINS_SUCCESS"; payload: Admin[] }
  | { type: "SELECT_ADMIN"; payload: Admin };
