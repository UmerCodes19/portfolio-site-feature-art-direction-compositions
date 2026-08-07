const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto('http://localhost:3000/#projects');
  await new Promise(r => setTimeout(r, 2000));

  // Hero Featured Project (adhura) - scrolled into view with text block
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/hero_featured_adhura_refined.png' });

  // Side-by-Side Featured Cards (Algorhythms & Trace)
  await page.evaluate(() => window.scrollBy(0, 850));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/side_by_side_refined.png' });

  await browser.close();
  console.log('Screenshots captured in public/');
})();
