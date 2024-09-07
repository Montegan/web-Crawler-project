const { URL } = require("url");
const { JSDOM } = require("jsdom");

async function startCrawl(baseURL, currentURL, pages) {
  const baseURLobj = new URL(baseURL);
  const currentURLobj = new URL(currentURL);

  if (baseURLobj.hostname !== currentURLobj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeUrl(currentURLobj);

  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  console.log(`Actively crawling current URL:${currentURL}`);
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`Fetch failled with code: ${resp.status} on page ${baseURL}`);
      return pages;
    }

    const content = resp.headers.get("content-type");

    if (!content.includes("text/html")) {
      console.log(
        `non html response from ${baseURL}, content type: ${content}`
      );
      return pages;
    }

    const inputHTML = await resp.text();
    const newurls = getUrlFromHTML(inputHTML, baseURL);

    //console.log(newurls);
    for (let newurl of newurls) {
      pages = await startCrawl(baseURL, newurl, pages);
    }
  } catch (error) {
    console.log(`${error.message} on website ${baseURL}`);
  }
  return pages;
}

function normalizeUrl(urlString) {
  const input = new URL(urlString);
  let finalurl;
  if (input.pathname[input.pathname.length - 1] === "/") {
    const trimedPath = input.pathname.slice(0, 5);
    //console.log(trimedPath);
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
