import Blog from "./Blog.jsx";
import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs.js";
import { List, Typography } from "@mui/material";

export const Blogs = ({ user }) => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    enabled: !!user,
  });

  if (isLoading) return <div>Loading blogs...</div>;
  if (isError) return <div>Error loading blogs.</div>;

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Blogs
      </Typography>
      <List dense>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </List>
    </div>
  );
};
