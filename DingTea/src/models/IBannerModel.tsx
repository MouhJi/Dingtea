export interface IBannerModel {
  id: number;
  url?: string;
  type?: string;
  title?: string;
  content?: string;
  position?: number;
  image_url?: string;
  mobile_url?: string;
  view_count?: number;
  click_count?: number;
  is_active?: boolean;
  is_visible?: boolean;
  created_by?: {
    id?: string;
    name?: string;
  };
  created_at?: number;
  updated_at?: number;
}
