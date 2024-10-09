"use client";
import { useState, useEffect } from "react";
import { BlogItem } from "./BlogItem";
import { Blog, fetchBlogs, BlogResponse } from "../api/blog";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

const BlogListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  padding: 20px;

  /* Ensure that the first two items span across two columns */
  & > *:nth-child(1),
  & > *:nth-child(2) {
    grid-column: span 6;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
`;

export const BlogList = ({ initialData }: { initialData: BlogResponse }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: ({ pageParam = 1 }) => fetchBlogs(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage + 1 > lastPage.totalPages) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    },
    initialData: { pages: [initialData], pageParams: [1] },
    initialPageParam: 1,
  });

  const blogs = data?.pages.reduce<Blog[]>(
    (acc, page) => [...acc, ...page.blogs],
    []
  );

  if (!isMounted) {
    return null;
  }

  return (
    <InfiniteScroll
      dataLength={blogs ? blogs.length : 0}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<LoadingMessage>Loading more blogs...</LoadingMessage>}
    >
      <BlogListContainer>
        {blogs?.map((blog) => (
          <BlogItem key={blog._id} blog={blog} />
        ))}
      </BlogListContainer>
    </InfiniteScroll>
  );
};
