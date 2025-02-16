// blogsReducer.ts
import { BlogsState, BlogAction } from "./../../Types/blogsTypes";

const initialState: BlogsState = {
  blogsList: [],
  selectedBlog: null,
};

const blogsReducer = (state = initialState, action: BlogAction): BlogsState => {
  switch (action.type) {
    case "FETCH_BLOGS_SUCCESS":
      return { ...state, blogsList: action.payload };
    case "SELECT_BLOG":
      return { ...state, selectedBlog: action.payload };
    default:
      return state;
  }
};

export default blogsReducer;
