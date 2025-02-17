import { Link } from "react-router-dom";
import { ListItem } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <>
      <ListItem>
        <Link color="inherit" to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </ListItem>
    </>
  );
};

export default Blog;
