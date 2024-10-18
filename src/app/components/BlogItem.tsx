import Link from "next/link";
import { Blog } from "../api/blog";
import {
  BlogCategory,
  BlogContent,
  BlogDate,
  BlogDescription,
  BlogFooter,
  BlogHeader,
  BlogImage,
  BlogItemContainer,
  BlogItemContentContainer,
  BlogTitle,
} from "../styles/customComponents";
import { capitalize } from "../utils/utils";

export const BlogItem = ({ blog }: { blog: Blog }) => {
  return (
    <BlogItemContainer>
      <Link
        href={`/blog/${blog._id}`}
        passHref
        style={{ width: "fit-content" }}
      >
        <BlogItemContentContainer>
          {!!blog.image && <BlogImage src={blog.image} alt={blog.title} />}
          <BlogContent>
            <BlogHeader>
              <BlogTitle>{capitalize(blog.title)}</BlogTitle>
              <BlogCategory>{capitalize(blog.category)}</BlogCategory>
            </BlogHeader>
            <BlogDescription>
              {blog.content.slice(0, 120)}
              {blog.content.length > 120 ? "..." : ""}
            </BlogDescription>
          </BlogContent>
          <BlogFooter>
            <BlogDate>Author: {capitalize(blog.author.name || "")}</BlogDate>
            <BlogDate>
              {new Date(blog.updated_at).toLocaleDateString()}
            </BlogDate>
          </BlogFooter>
        </BlogItemContentContainer>
      </Link>
    </BlogItemContainer>
  );
};
