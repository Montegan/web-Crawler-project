const { startCrawl } = require("./crawl");

function main() {
  if (process.argv.length < 3) {
    console.log("No web url provided");
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log("input more than expected");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  startCrawl(baseURL);
  console.log(baseURL);
}
main();
