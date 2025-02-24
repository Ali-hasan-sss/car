// blogsTypes.ts
export interface Blog {
  id: number;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
  image: string;
  description: { en: string; ar: string };
  ondelete?: () => void;
  onedit?: () => void;
}

export interface BlogsState {
  blogsList: Blog[];
  selectedBlog: Blog | null;
}

export type BlogAction =
  | { type: "FETCH_BLOGS_SUCCESS"; payload: Blog[] }
  | { type: "SELECT_BLOG"; payload: Blog };
