const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

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
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const { id } = request.params;
    const blog = await Blog.findById(id);

    if (blog.user.toString() !== decodedToken.id) {
      return response.status(401).json({
        error: "Unauthorized to access the blog",
      });
    }

    await blog.deleteOne();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

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
