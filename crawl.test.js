const { test, expect } = require("@jest/globals");
const { normalizeUrl } = require("./crawl.js");

test("strip url trailing slashes", () => {
  const input = "https://blog.boot.dev/path/";
  const result = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(result).toEqual(expected);
});

test("lowercase capital urls", () => {
  const input = "Https://Blog.boot.dev/path/";
  const result = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(result).toEqual(expected);
});

test("normalizeUrl strip http/https", () => {
  const input = "http://Blog.boot.dev/path/";
  const result = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(result).toEqual(expected);
});
