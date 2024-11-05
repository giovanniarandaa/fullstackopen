const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs = []) => {
  return blogs.reduce((acc, current) => acc + current.likes, 0);
};

const favoriteBlog = (blogs = []) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((acc, current) =>
    acc.likes < current.likes ? current : acc,
  );
};

const mostBlogs = (blogs = []) => {
  const authorCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  const topAuthor = Object.keys(authorCounts).reduce((acc, author) => {
    if (!acc || authorCounts[author] > authorCounts[acc]) {
      return author;
    }
    return acc;
  }, null);

  return topAuthor
    ? { author: topAuthor, blogs: authorCounts[topAuthor] }
    : null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
