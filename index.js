const puppeteer = require('puppeteer');
const express = require('express')
const app = express()
const port = 3000

// const url = 'https://www.doh.wa.gov/Emergencies/Coronavirus';

async function fetch(url, cb) {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor(2000);
  await page.waitForSelector('body');

  let pageContent = await page.content();
  await browser.close();

  return cb(pageContent);
};


app.get('/', (req, res) => {
  let url = req.query.url;

  fetch(url, function(pageContent) {
    return res.send(pageContent);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
