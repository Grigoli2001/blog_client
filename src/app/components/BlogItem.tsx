import Link from "next/link";
import styled from "styled-components";
import { Blog } from "../api/blog";
// style link

const BlogItemContentContainer = styled.div``;
const BlogItemContainer = styled.div`
  border: 2px solid #afafaf;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px;
  transition: transform 0.2s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-5px);
  }
  grid-column: span 4;
  height: auto;
  width: 100%; /* Full width for grid alignment */
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 15px;
`;

const BlogTitle = styled.h2`
  font-size: 1.2rem;
  color: #333;
  overflow-wrap: break-word;
  max-width: 80%;
`;

const BlogDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const BlogFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;
`;
const BlogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BlogCategory = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  color: #454444;
`;

const BlogDate = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

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
              <BlogTitle>{blog.title}</BlogTitle>
              <BlogCategory>{blog.category}</BlogCategory>
            </BlogHeader>
            <BlogDescription>
              {blog.content.slice(0, 120)}
              {blog.content.length > 120 ? "..." : ""}
            </BlogDescription>
          </BlogContent>
          <BlogFooter>
            <BlogDate>Author: {blog.author.name}</BlogDate>
            <BlogDate>
              {new Date(blog.updated_at).toLocaleDateString()}
            </BlogDate>
          </BlogFooter>
        </BlogItemContentContainer>
      </Link>
    </BlogItemContainer>
  );
};
