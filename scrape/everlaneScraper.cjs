const puppeteer = require('puppeteer');

firstURL = 'https://www.everlane.com/search?q=black+men+tshirt';

const everlaneScrape = async(firstURL) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(firstURL, {waitUntil: 'networkidle2'});

    const productURL = await page.evaluate(() => {
        const firstLink = document.querySelector("div.styles_product-group-tiles__K8xNY > div:nth-child(1) > a");
        return firstLink ? firstLink.href : null;
    });
    
    await browser.close();
    return productURL;
}
module.exports = { everlaneScrape };