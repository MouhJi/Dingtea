import {IAddressShopModel} from './IAddressShopModel';
import {IAddressUserModal} from './IAddressUserModal';
import {ICartModel} from './ICartModel';
import {IVoucherModel} from './IVoucherModel';

export interface IOrderModel {
  id: number;
  code?: string;
  type?: string;
  note?: string;
  source?: string;
  status?: string;
  store?: IAddressShopModel;
  created_by?: {
    id?: string;
    name?: string;
  };
  confirmed_by?: null;
  cancelled_by?: null;
  customer?: IAddressUserModal;
  channel?: {
    id?: string | number;
    logo?: string;
    name?: string;
    note?: string;
    is_active?: true;
    created_by?: {
      id?: string;
      name?: string;
    };
  };
  payment?: {
    name?: string;
    type?: string | number;
    method?: string | number;
  };
  shipping?: {
    name?: string;
    type?: string | number;
    method?: string | number;
  };
  discounts?: IVoucherModel[];
  products: ICartModel[];
  total_coin?: number;
  total_point?: number;
  total_quantity?: number;
  total_price_before_discount?: number;
  total_discount_value?: number;
  total_original_price?: number;
  total_shipping_fee?: number;
  total_price?: number;
  total_paid?: number;
  total_unpaid?: number;
  created_at?: number;
  updated_at?: number;
  confirmed_at?: number;
  cancelled_at?: number;
}
