const { test, expect } = require("@jest/globals");
const { normalizeUrl, getUrlFromHTML } = require("./crawl.js");

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

test("scrapes all the absolute url from the html page", () => {
  const inputHTML = `<html> <body> 
  <a href="https://blog.boot.dev "> Boot.dev Blog </a"> Boot.dev Blog
  </body> </html>`;
  const baseURL = "https://blog.boot.dev";
  const result = getUrlFromHTML(inputHTML, baseURL);
  const expected = ["https://blog.boot.dev/"];
  expect(result).toEqual(expected);
});

test("scrapes all the relative url from the html page", () => {
  const inputHTML = `<html> <body> 
    <a href="/path/"> Boot.dev Blog </a"> Boot.dev Blog
    </body> </html>`;
  const baseURL = "https://blog.boot.dev";
  const result = getUrlFromHTML(inputHTML, baseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(result).toEqual(expected);
});

test("scrapes both url from the html page", () => {
  const inputHTML = `<html> <body> 
      <a href="/path/1"> Boot.dev Blog 1 </a"> 
      <a href="https://blog.boot.dev/path/2"> Boot.dev Blog 2 </a">
      </body> </html>`;
  const baseURL = "https://blog.boot.dev";
  const result = getUrlFromHTML(inputHTML, baseURL);
  const expected = [
    "https://blog.boot.dev/path/1",
    "https://blog.boot.dev/path/2",
  ];
  expect(result).toEqual(expected);
});

test("Normalize invalid url", () => {
  const inputHTML = `<html> <body>
        <a href="invalid"> Invalid url </a">
        </body> </html>`;
  const baseURL = "https://blog.boot.dev";
  const result = getUrlFromHTML(inputHTML, baseURL);
  const expected = [];
  expect(result).toEqual(expected);
});
