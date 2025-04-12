export interface ICategoryModel {
  id: number;
  name: string;
  path?: any[];
  logo?: string;
  image?: string;
  content?: string;
  position?: number;
  parent_id?: number;
  is_app_visible?: true;
  is_home_visible?: false;
  is_active?: true;
  created_by?: object;
  children?: any[];
  created_at?: number;
  updated_at?: number;
}
