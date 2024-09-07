const { test, expect } = require("@jest/globals");
const { sortPages } = require("./crawlReport");

test("sort page items", () => {
  const pages = {
    "wagslane.dev": 10,
    "wagslane.dev/tags": 12,
    "wagslane.dev/about": 1,
    "wagslane.dev/index.xml": 3,
    "wagslane.dev/tags/business": 13,
    "wagslane.dev/posts/dark-patterns": 2,
    "wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business": 2,
  };

  const result = sortPages(pages);
  const expected = [
    ["wagslane.dev/about", 1],
    ["wagslane.dev/posts/dark-patterns", 2],
    ["wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business", 2],
    ["wagslane.dev/index.xml", 3],
    ["wagslane.dev", 10],
    ["wagslane.dev/tags", 12],
    ["wagslane.dev/tags/business", 13],
  ];

  expect(result).toEqual(expected);
});
