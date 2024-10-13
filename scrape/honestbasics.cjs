const puppeteer = require('puppeteer');

firstURL = 'https://www.honest-basics.com/search?q=men+black+t+shirt';

const honestScrape = async(firstURL) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(firstURL, {waitUntil: 'networkidle2'});

    const productURL = await page.evaluate(() => {
        const firstLink = document.querySelector("#gf-products > div:nth-child(1) > div > div > a");
        return firstLink ? firstLink.href : null;
    });
    
    console.log(productURL);
    await browser.close();
    return productURL;
}

honestScrape(firstURL).catch(console.error);