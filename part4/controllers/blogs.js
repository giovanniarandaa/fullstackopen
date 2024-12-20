const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.put("/:id", async (request, response) => {
  const { author, title, url, likes } = request.body;
  const blog = {
    author,
    title,
    url,
    likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const userRequest = request.user;
  const user = await User.findById(userRequest.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const userRequest = request.user;

      const { id } = request.params;
      const blog = await Blog.findById(id);

      if (blog.user.toString() !== userRequest.id) {
        return response.status(401).json({
          error: "Unauthorized to access the blog",
        });
      }

      await blog.deleteOne();
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

blogsRouter.get("/:id", async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).send({ error: "malformatted id" });
  }

  try {
    const note = await Blog.findById(id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(500).json({ error: "something went wrong" });
  }
});

module.exports = blogsRouter;
