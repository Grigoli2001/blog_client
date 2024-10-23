"use client";
import { useState, useEffect } from "react";
import { BlogItem } from "./BlogItem";
import { Blog, fetchBlogs, BlogResponse } from "../api/blog";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import useIsMobile from "../hooks/useMobile";

const BlogListContainer = styled.div<{ isMobile?: boolean }>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  padding: 20px;

  & > *:nth-child(1),
  & > *:nth-child(2) {
    grid-column: ${({ isMobile }) => (isMobile ? "span" : "span 6")};
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

const CategoryFilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const CategoryFilterContainerMobile = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;

const CategoryButton = styled.button<{ isActive: boolean }>`
  padding: 8px 14px;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? "#1976d2" : "inherit")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#000")};
  border: none;
  border-radius: 20px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #1976d2;
    color: #fff;
  }
`;

const categories = [
  "All",
  "Company",
  "Product",
  "Design",
  "Engineering",
  "Other",
];

export const BlogList = ({ initialData }: { initialData: BlogResponse }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data, fetchNextPage, hasNextPage, error } = useInfiniteQuery({
    queryKey: ["blogs", selectedCategory],
    queryFn: ({ pageParam = 1 }) =>
      fetchBlogs(pageParam, 6, selectedCategory?.toLowerCase()),
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === "All" ? null : category);
  };
  if (error) {
    return <div>Something went wrong</div>;
  }
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {!isMobile ? (
        <CategoryFilterContainer>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              isActive={
                selectedCategory === category ||
                (category === "All" && !selectedCategory)
              }
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryFilterContainer>
      ) : (
        <CategoryFilterContainerMobile>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              isActive={
                selectedCategory === category ||
                (category === "All" && !selectedCategory)
              }
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryFilterContainerMobile>
      )}
      <InfiniteScroll
        dataLength={blogs ? blogs.length : 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<LoadingMessage>Loading more blogs...</LoadingMessage>}
      >
        <BlogListContainer isMobile={isMobile}>
          {blogs?.map((blog) => (
            <BlogItem key={blog._id} blog={blog} />
          ))}
        </BlogListContainer>
      </InfiniteScroll>
    </>
  );
};
