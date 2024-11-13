const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const app = require("../../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("unique identifier property of blog posts is named id", async () => {
  const response = await api.get("/api/blogs").expect(200);

  response.body.forEach((blog) => {
    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  });
});

test("a new blog can be created with a POST request", async () => {
  const initialBlogs = await helper.blogsInDb();

  const newBlog = {
    title: "Nuevo Blog",
    author: "Autor de Prueba",
    url: "http://example.com",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  assert.ok(titles.includes(newBlog.title));
});

test("if the likes property is missing, it defaults to 0", async () => {
  const newBlog = {
    title: "Blog sin Likes",
    author: "Autor de Prueba",
    url: "http://example.com",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogCreated = response.body;
  assert.strictEqual(blogCreated.likes, 0);
});

test("responds with 400 Bad Request if url is missing", async () => {
  const newBlog = {
    title: "Title without URL",
    author: "Author",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(
    response.body.error,
    "Blog validation failed: url: URL is required",
  );
});

describe("viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultNote = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.deepStrictEqual(resultNote.body, blogToView);
  });

  test("fails with statuscode 404 if note does not exist", async () => {
    const validNonexistingId = helper.nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

test("deletion of a blog", async () => {
  const blogAtStart = await helper.blogsInDb();
  const blogToDelete = blogAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length - 1);

  const contents = blogAtEnd.map((r) => r.title);

  assert(!contents.includes(blogToDelete.title));
});

after(async () => {
  await mongoose.connection.close();
});
