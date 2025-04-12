export interface IAddressShopModel {
  id?: number;
  name?: string;
  logo?: string;
  phone?: string;
  email?: string;
  description?: string;
  status?: string;
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
  created_by?: {
    id?: string;
    name?: string;
  };
  created_at?: number;
  updated_at?: number;
}
