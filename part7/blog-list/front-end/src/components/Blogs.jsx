import Blog from "./Blog.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs.js";
import { setNotification } from "../../reducers/notificationReducer.js";

export const Blogs = ({ user, dispatch }) => {
  const queryClient = useQueryClient();
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    enabled: !!user,
  });

  const likeBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      dispatch(setNotification("Liked blog!", "success"));
    },
    onError: () => {
      dispatch(setNotification("Error liking blog", "error"));
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      dispatch(setNotification("Blog deleted!", "success"));
    },
    onError: () => {
      dispatch(setNotification("Error deleting blog", "error"));
    },
  });

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    likeBlogMutation.mutate({ id: blog.id, updatedBlog });
  };

  const handleDelete = async (blog) => {
    const confirm = window.confirm(
      `Delete blog ${blog.title} by ${blog.author}?`,
    );

    if (confirm) {
      await deleteBlogMutation.mutateAsync(blog.id);
      dispatch(setNotification(`Deleted "${blog.title}"`));
    }
  };

  if (isLoading) return <div>Loading blogs...</div>;
  if (isError) return <div>Error loading blogs.</div>;

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          handleDelete={handleDelete}
          handleLike={handleLike}
          key={blog.id}
          blog={blog}
          user={user}
        />
      ))}
    </div>
  );
};
