const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const mongoose = require("mongoose");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
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
