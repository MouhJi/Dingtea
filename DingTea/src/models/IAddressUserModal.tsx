export interface IAddressUserModal {
  id?: number;
  type?: string;
  name?: string;
  phone?: string;
  address?: string;
  province?: {
    id?: string;
    name?: string;
  };
  district?: {
    id?: string;
    name?: string;
  };
  ward?: {
    id?: string;
    name?: string;
  };
  is_default?: boolean;
  is_active?: boolean;
  created_by?: {
    id?: string;
    name?: string;
  };
  created_at?: number;
  updated_at?: number;
}
