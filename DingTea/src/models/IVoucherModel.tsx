export interface IVoucherModel {
  id: number;
  code?: string;
  name?: string;
  thumbnail_url?: string;
  content?: string;
  status?: string;
  status_name?: string;
  applied_categories?: number[];
  applied_members?: number[];
  applied_stores?: number[];
  applied_users?: number[];
  applied_max_quantity?: number;
  applied_order_value?: number;
  applied_start_time?: number;
  applied_stop_time?: number;
  discount_type?: 1 | 2; //1 là %, 2 là số tiền
  discount_value?: number;
  max_discount_value?: number;
  created_by?: {
    id?: string;
    name?: string;
  };
  created_at?: number;
  updated_at?: number;

  status_local?: 1 | 2 | 3; // 1 là dùng được, 2 là chưa đủ điều kiện dùng, 3 là đã hết hạn dùng,
  type?: 1 | 2; // trùng giá trị với discount_type
  value?: number; // trùng giá trị với discount_value
  group?: string; // mặc định là voucher
}
