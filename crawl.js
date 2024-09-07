const { URL } = require("url");
const { JSDOM } = require("jsdom");

async function startCrawl(baseURL) {
  console.log(`Actively crawling current URL:${baseURL}`);
  try {
    const resp = await fetch(baseURL);
    if (resp.status > 399) {
      console.log(`Fetch failled with code: ${resp.status} on page ${baseURL}`);
      return;
    }

    const content = resp.headers.get("content-type");

    if (!content.includes("text/html")) {
      console.log(
        `non html response from ${baseURL}, content type: ${content}`
      );
      return;
    }

    console.log(await resp.text());
  } catch (error) {
    console.log(`${error.message} on website ${baseURL}`);
  }
}

function normalizeUrl(urlString) {
  const input = new URL(urlString);
  let finalurl;
  if (input.pathname[input.pathname.length - 1] === "/") {
    const trimedPath = input.pathname.slice(0, 5);
    console.log(trimedPath);
    return (finalurl = input.hostname + trimedPath);
  } else {
    return (finalurl = input.hostname + input.pathname);
  }
}

function getUrlFromHTML(inputHTML, BaseURL) {
  const urls = [];
  const dom = new JSDOM(inputHTML);
  const linkTag = dom.window.document.querySelectorAll("a");
  for (item of linkTag) {
    if (item.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${BaseURL}${item.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Relative path error ${err}`);
      }
    } else {
      try {
        const urlObj = new URL(item.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`Absolute path error ${error}`);
      }
    }
  }
  return urls;
}

//console.log(normalizeUrl("https://blog.boot.dev/path/"));
module.exports = { normalizeUrl, getUrlFromHTML, startCrawl };
