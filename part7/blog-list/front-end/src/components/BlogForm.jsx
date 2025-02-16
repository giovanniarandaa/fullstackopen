import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog(form);
    setForm({ title: "", author: "", url: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create a new blog</h2>
      <div>
        title
        <input
          data-testid="title"
          aria-label="title"
          type="text"
          name="title"
          value={form.title}
          onChange={({ target }) => setForm({ ...form, title: target.value })}
        />
      </div>
      <div>
        author
        <input
          data-testid="author"
          type="text"
          name="author"
          aria-label="author"
          value={form.author}
          onChange={({ target }) => setForm({ ...form, author: target.value })}
        />
      </div>
      <div>
        url
        <input
          data-testid="url"
          aria-label="url"
          type="text"
          name="url"
          value={form.url}
          onChange={({ target }) => setForm({ ...form, url: target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
export default BlogForm;
