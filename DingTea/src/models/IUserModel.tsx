export interface IDataUser {
  token: ITokenModel;
  user: IUserModel;
}

export interface ITokenModel {
  access_token: string;
  refresh_token: string;
  access_expired_at: number;
  refresh_expired_at: number;
  type?: string;
}

export interface IUserModel {
  id?: number;
  name?: string;
  note?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  cover?: string;
  gender?: string;
  birthday?: number;
  tax_code?: string;
  company?: string;
  country?: string;
  address?: string;
  is_active?: boolean;
  is_verified_phone?: boolean;
  is_verified_email?: boolean;
  is_verified_password?: boolean;
  type?: string;
  role?: string;
  group?: string;
  stores?: any;
  status?: string;
  permissions?: string[];
  created_by?: {
    id?: string | number;
    name?: string;
  };
  total_debt?: number;
  total_order_price?: number;
  total_invoice_price?: number;
  total_return_price?: number;
  total_purchase?: number;
  total_point?: number;
  created_at?: number;
  updated_at?: number;
  last_purchase?: string | number;
}
