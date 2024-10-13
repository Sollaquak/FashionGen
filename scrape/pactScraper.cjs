const puppeteer = require('puppeteer');

firstURL = 'https://wearpact.com/search?term=men%20t%20shirt&sc=mml,mfw,mcn,mvk,mbw,mvr,mxe,mfw3,mcn3';

const pactScrape = async(firstURL) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(firstURL, {waitUntil: 'networkidle2'});

    const productURL = await page.evaluate(() => {
        const firstLink = document.querySelector("#product-grid-search > div > div:nth-child(1) > div > a");
        return firstLink ? firstLink.href : null;
    });
    
    console.log(productURL);
    await browser.close();
    return productURL;
}

pactScrape(firstURL).catch(console.error);