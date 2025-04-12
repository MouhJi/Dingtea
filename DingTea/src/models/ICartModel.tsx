import {ICategoryModel} from './ICategoryModel';

export interface ICartModel {
  random_id?: number | string;
  id?: number;
  sku?: string;
  name?: string;
  option_name?: string;
  type?: 'item' | 'topping' | 'option';
  unit?: any;
  brand?: any;
  price?: number;
  discount?: number;
  option_id?: number;
  categories?: ICategoryModel[];
  total_price?: number;
  normal_price?: number;
  original_price?: number;
  total_quantity?: number;
  product_options?: ICartModel[];
  total_option_price?: number;
  total_discount_value?: number;
  total_original_price?: number;
  total_price_before_discount?: number;
  option_type?: string;
  note?: string;
  thumbnail_url?: string;
}
