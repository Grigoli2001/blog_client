import { BlogList } from "./components/BlogList";
import { fetchBlogs, BlogResponse } from "./api/blog";

export default async function Home() {
  const initialData: BlogResponse = await fetchBlogs(1);

  return <BlogList initialData={initialData} />;
}
