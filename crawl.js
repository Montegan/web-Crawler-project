const { URL } = require("url");

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

console.log(normalizeUrl("https://blog.boot.dev/path/"));
module.exports = { normalizeUrl };
