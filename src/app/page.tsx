import { BlogList } from "./components/BlogList";
import { fetchBlogs } from "./api/blog";
import { catchError } from "./utils/utils";

export default async function Home() {
  const [error, initialData] = await catchError(fetchBlogs(1));
  if (error) {
    return <div>Failed to load blogs</div>;
  } else {
    return <BlogList initialData={initialData} />;
  }
}
