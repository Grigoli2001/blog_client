import axios from "axios";

export interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  status: string;
  category: string;
  author: {
    email: string;
    name?: string;
  };
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface BlogResponse {
  blogs: Blog[];
  currentPage: number;
  totalBlogs: number;
  totalPages: number;
}
export const fetchBlogs = async (
  page: number = 1,
  limit: number = 6,
  category?: string | null
): Promise<BlogResponse> => {
  const response = await axios.get(`http://localhost:8080/api/blogs/`, {
    params: { page, limit, category },
  });
  return response.data as BlogResponse;
};

export const fetchBlogById = async (id: string) => {
  const response = await axios.get(`http://localhost:8080/api/blog/${id}`);
  return response.data as Blog;
};
