export interface IBlogModel {
  id: number;
  type?: string;
  title?: string;
  slug?: string;
  avatar?: string;
  content?: string;
  description?: string;
  categories?: [
    {
      id?: number;
      name?: string;
      slug?: string;
    }
  ];
  hashtag?: string[];
  like_count?: number;
  view_count?: number;
  meta_url?: string;
  meta_title?: string;
  meta_image?: string;
  meta_content?: string;
  is_public?: true;
  is_active?: true;
  created_by?: {
    id?: string;
    name?: string;
  };
  created_at?: number;
  updated_at?: number;
}
