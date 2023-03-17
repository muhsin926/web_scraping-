const puppeteer = require("puppeteer");

async function scrape(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector("span [title='jauhar Brototype']", { timeout: 60000 });
  const target = await page.$("span [title='jauhar Brototype']", { timeout: 60000 });
  await target.click();
  const inp = await page.$(
    "#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt > p"
  );

  for (let i = 0; i < 100; i++) {
    await inp.type("ok this is magic");
    await page.keyboard.press("Enter");
  }
}

scrape("https://web.whatsapp.com");