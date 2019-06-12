const fs = require('fs');
const puppeteer = require('puppeteer');
const argv = require('yargs').argv;
const outputpath = argv.output;

(async () => {
  const html = fs.readFileSync('/dev/stdin', 'utf8').toString();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 375, height: 667, deviceScaleFactor: 2});
  await page.setContent(html, {waitUntil: 'networkidle0'});
  await page.screenshot({path: outputpath, fullPage: true, type: 'png'});

  await browser.close();
})();

// npm WARN deprecated @babel/polyfill@7.4.4: 🚨 As of Babel 7.4.0, this
// npm WARN deprecated package has been deprecated in favor of directly
// npm WARN deprecated including core-js/stable (to polyfill ECMAScript
// npm WARN deprecated features) and regenerator-runtime/runtime
// npm WARN deprecated (needed to use transpiled generator functions):
// npm WARN deprecated
// npm WARN deprecated   > import "core-js/stable";
// npm WARN deprecated   > import "regenerator-runtime/runtime";
