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

after(async () => {
  await mongoose.connection.close();
});
