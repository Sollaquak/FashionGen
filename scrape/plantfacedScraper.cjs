const puppeteer = require('puppeteer');

firstURL = 'https://plantfacedclothing.com/search?q=mens+black+tee';

const plantfacedScrape = async(firstURL) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(firstURL, {waitUntil: 'networkidle2'});

    const productURL = await page.evaluate(() => {
        const firstLink = document.querySelector("#product-grid > li:nth-child(1) > product-card > div > a");
        return firstLink ? firstLink.href : null;
    });
    
    console.log(productURL);
    await browser.close();
    return productURL;
}

plantfacedScrape(firstURL).catch(console.error);