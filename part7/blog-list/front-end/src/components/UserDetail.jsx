import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";

export const UserDetail = () => {
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => blogService.getUser(id),
  });

  if (isLoading) return <div>Loading user details...</div>;
  if (isError) return <div>Error loading user details.</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};
