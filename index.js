const { startCrawl } = require("./crawl");
const { formatReport } = require("./crawlReport");

async function main() {
  if (process.argv.length < 3) {
    console.log("No web url provided");
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log("input more than expected");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  const pages = await startCrawl(baseURL, baseURL, {});
  formatReport(pages);
  // console.log(pages);
  // console.log(baseURL);
}
main();
