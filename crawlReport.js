const pages = {
  "wagslane.dev": 10,
  "wagslane.dev/tags": 12,
  "wagslane.dev/about": 1,
  "wagslane.dev/index.xml": 3,
  "wagslane.dev/tags/business": 13,
  "wagslane.dev/posts/dark-patterns": 2,
  "wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business": 2,
};

function formatReport(sortedPages) {
  const sortedItems = sortPages(sortedPages);
  let output = "==============\n";
  output += "CRAWL REPORT\n";
  output += "==============\n";

  for (const page of sortedItems) {
    output += `${page[1]} total visits to page ${page[0]}\n`;
  }

  console.log(output);
}

function sortPages(pages) {
  let temparry = [];
  //   for (const count in pages) {
  //     temparry.push(pages[count]);
  //   }
  //   console.log(temparry.sort((a, b) => a - b));
  //   for (const val of temparry) {
  //   }

  for (const vals of Object.entries(pages)) {
    temparry.push(vals);
  }
  console.log(temparry.sort((a, b) => b[1] - a[1]));
  return temparry;
}

sortPages(pages);

module.exports = { sortPages, formatReport };
