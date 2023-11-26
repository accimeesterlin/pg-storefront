export interface Category {
  id: string;
  title?: string;
  name?: string; // deparacted
  slug: string;
  icon?: string;
  image?: string;
  parent: string[];
  featured?: boolean;
  description?: string;
  child?: any[];
}

export default Category;
