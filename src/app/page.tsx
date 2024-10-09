import { BlogList } from "./components/BlogList";
import { fetchBlogs, BlogResponse } from "./api/blog";

async function getBlogs(): Promise<BlogResponse> {
  return await fetchBlogs(1);
}

export default async function Home() {
  const initialData = await getBlogs();

  return <BlogList initialData={initialData} />;
}
