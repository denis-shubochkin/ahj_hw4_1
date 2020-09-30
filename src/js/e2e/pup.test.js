import puppeteer from 'puppeteer';

jest.setTimeout(30000);
describe('Validation form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 100
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  test('show not found card system', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.check-form');
    const input = await form.$('.input');
    await input.type('1111');
    const submit = await form.$('.check-button');
    submit.click();
    await page.waitForSelector('.card');
    const card = await page.$('.card');
    const value = await page.evaluate((el) => el.textContent, card);
    if (value !== 'Платежная система не определена') { throw new Error('error'); }
  });

  test('show visa card system', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.check-form');
    const input = await form.$('.input');
    await input.type('4013');
    const submit = await form.$('.check-button');
    submit.click();
    await page.waitForSelector('.card');
    const card = await page.$('.card');
    const value = await page.evaluate((el) => el.textContent, card);
    if (value !== 'VISA') { throw new Error('error'); }
  });

  test('short card number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.check-form');
    const input = await form.$('.input');
    await input.type('123456');
    const submit = await form.$('.check-button');
    submit.click();
    await page.waitForSelector('.hidden-incorrect');
    const label = await page.$('.hidden-incorrect');
    const value = await page.evaluate((el) => el.style.display, label);
    if (value !== 'block') { throw new Error('error'); }
  });

  test('long card number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.check-form');
    const input = await form.$('.input');
    await input.type('12345634545345476587654351235');
    const submit = await form.$('.check-button');
    submit.click();
    await page.waitForSelector('.hidden-incorrect');
    const label = await page.$('.hidden-incorrect');
    const value = await page.evaluate((el) => el.style.display, label);
    if (value !== 'block') { throw new Error('error'); }
  });

  test('correct number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.check-form');
    const input = await form.$('.input');
    await input.type('1234 4453 5554 7772');
    const submit = await form.$('.check-button');
    submit.click();
    await page.waitForSelector('.hidden-correct');
    const label = await page.$('.hidden-correct');
    const value = await page.evaluate((el) => el.style.display, label);
    if (value !== 'block') { throw new Error('error'); }
  });

  test('incorrect number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.check-form');
    const input = await form.$('.input');
    await input.type('1234 4453 5554 7777');
    const submit = await form.$('.check-button');
    submit.click();
    await page.waitForSelector('.hidden-luhn');
    const label = await page.$('.hidden-luhn');
    const value = await page.evaluate((el) => el.style.display, label);
    if (value !== 'block') { throw new Error('error'); }
  });
});
