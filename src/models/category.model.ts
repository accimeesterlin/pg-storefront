export interface Category {
  id: string;
  title?: string;
  slug: string;
  icon?: string;
  image?: string;
  parent: string[];
  featured?: boolean;
  description?: string;
}

export default Category;
