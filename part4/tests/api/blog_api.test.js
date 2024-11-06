const { test, after, beforeEach } = require("node:test");
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

after(async () => {
  await mongoose.connection.close();
});
