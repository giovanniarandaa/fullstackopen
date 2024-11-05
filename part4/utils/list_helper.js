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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
