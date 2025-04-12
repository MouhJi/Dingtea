import {ICategoryModel} from './ICategoryModel';

export interface IProductModel {
  id: number;
  sku: string;
  type?: string;
  status?: string;
  thumbnail_url?: string;
  name?: string;
  option_name: string;
  rating_count?: number;
  hashtag?: string[];
  description?: string;
  normal_price?: number;
  price?: number;
  categories?: ICategoryModel[];
  products?: IProductModel[];
  variations?: {
    name?: string;
    values?: string[];
  }[];
  parent_id?: number;
  parent_name?: string;
  indexes?: number[];

  cateTmp?: ICategoryModel;
}
