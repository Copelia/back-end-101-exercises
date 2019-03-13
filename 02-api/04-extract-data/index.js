const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

const filePath = path.resolve(__dirname, 'data', 'books.json');
const saveJSON = content => writeFile(filePath, JSON.stringify(content));

const BOOK_SECTION_SELECTOR = 'tr';
// const BOOK_TITLE_SELECTOR = 'h5 > a > span';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.goodreads.com/author/list/3873.Mikhail_Bulgakov?utf8=%E2%9C%93&sort=average_rating');

    await page.waitForSelector(BOOK_SECTION_SELECTOR);

  const books = await page.$$eval(
      BOOK_SECTION_SELECTOR,
      bookSections => bookSections.map(
          section => ({
              title: section.querySelector('td > a > span').innerText,
              image: section.querySelector('td > a > img').src
              // image: section.querySelector('img').src,
              // author: section.querySelector('.a-row a.a-size-base').innerText,
          }),
      ),
  );

  await saveJSON(books);

  await browser.close();
})();