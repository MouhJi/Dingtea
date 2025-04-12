export interface IAddress {
  id?: number;
  name?: string;
  code?: string;
  district_code?: string;
  providers?: any[];
  is_active: true;
  created_by?: {
    id?: string;
    name?: string;
  };
  created_at?: number;
  updated_at?: number;
}
