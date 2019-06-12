const fs = require('fs');
const puppeteer = require('puppeteer');
const html = fs.readFileSync('/dev/stdin', 'utf8').toString();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://classpass.com');
  // await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle' });
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
