const puppeteer = require('puppeteer');

firstURL = 'https://yesfriends.co/search?options%5Bprefix%5D=last&type=product%2Carticle%2Cpage&q=mens+black+tshirt';

const yesfriendsScrape = async(firstURL) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(firstURL, {waitUntil: 'networkidle2'});

    const productURL = await page.evaluate(() => {
        const firstLink = document.querySelector("div > a.product-grid-item__title.font-body");
        return firstLink ? firstLink.href : null;
    });
    
    console.log(productURL);
    await browser.close();
    return productURL;
}

yesfriendsScrape(firstURL).catch(console.error);