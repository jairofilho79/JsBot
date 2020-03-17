const puppeteer = require('puppeteer');

const { delay } = require('../utils/utils');

(async () => {

    const browser = await puppeteer.launch({
        headless: false
    });
    const pages = await browser.pages();
    
    // Open drive.
    const page = pages[0];

    await page.goto('http://localhost:3000');

    // Focus input field.
    await page.waitFor('input',  {visible: true});
    await page.type('input','Olá!', {delay: 150});

    await page.keyboard.press('Enter');

    await page.waitFor('input',  {visible: true});
    await page.type('input','Quero me cadastrar no sistema!', {delay: 150});

    await page.keyboard.press('Enter');

    await page.waitFor('input',  {visible: true});
    await page.type('input','Tudo bem', {delay: 150});

    await page.keyboard.press('Enter');

    await page.waitFor('input',  {visible: true});
    await page.type('input','Jairo Filho', {delay: 150});

    await page.keyboard.press('Enter');

    await page.waitFor('input',  {visible: true});
    await page.type('input','91 9 91356096', {delay: 150});

    await page.keyboard.press('Enter');

    await page.waitFor('input',  {visible: true});
    await page.type('input','Rua Isaac de Oliveira, 71', {delay: 150});

    await page.keyboard.press('Enter');

    await page.waitFor('input',  {visible: true});
    await page.type('input','jairofilho79@gmail.com', {delay: 150});

    await page.keyboard.press('Enter');

    await page.waitFor('input',  {visible: true});
    await page.type('input','Tchau! Até logo!', {delay: 150});

    await page.keyboard.press('Enter');

    await delay(5000);

    page.close();

})();