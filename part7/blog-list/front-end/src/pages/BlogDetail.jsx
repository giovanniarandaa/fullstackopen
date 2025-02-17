import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs.js";
import { setNotification } from "../../reducers/notificationReducer.js";

export const BlogDetail = ({ dispatch }) => {
  const { id } = useParams();
  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getById(id),
  });

  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.createComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", id]);
      dispatch(setNotification("Comment added successfully!", "success"));
    },
    onError: () => {
      dispatch(setNotification("Error adding comment", "error"));
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", id]);
      dispatch(setNotification("Liked blog!", "success"));
    },
    onError: () => {
      dispatch(setNotification("Error liking blog", "error"));
    },
  });

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    likeBlogMutation.mutate({ id: blog.id, updatedBlog });
  };

  const createComment = (e) => {
    e.preventDefault();
    commentMutation.mutate({ id: blog.id, comment: e.target.comment.value });
    e.target.comment.value = "";
  };

  if (isLoading) return <div>Loading blog details...</div>;
  if (isError) return <div>Error loading blog details.</div>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </p>
      <p>
        likes <span className="likes">{blog.likes}</span>{" "}
        <button onClick={() => handleLike(blog)}>like</button>
      </p>
      <p>added by {blog.author}</p>
      <div className="comments">
        <h3>Comments</h3>
        <form onSubmit={createComment}>
          <input type="text" name="comment" />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
