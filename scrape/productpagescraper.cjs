const puppeteer = require('puppeteer');
const { everlaneScrape } = require('./everlaneScraper.cjs');
const { honestScrape } = require('./honestbasics.cjs');
const { pactScrape } = require('./pactScraper.cjs');
const { plantfacedScrape } = require('./plantfacedScraper.cjs');
const { yesfriendsScrape } = require('./yesfriendsScraper.cjs');

const everlaneURL = everlaneScrape();
//const honestURL = honestScrape();
//const pactURL = pactScrape();
//const plantfacedURL = plantfacedScrape();
//const yesfriendsURL = yesfriendsScrape();

const everlaneProduct = async(everlaneURL) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(everlaneURL, {waitUntil: 'domcontentloaded'});

    const productInfo = await page.evaluate(() => {
        const image = document.querySelector("img").getAttribute("src");
        const name = document.querySelector("div.styles_product-header__title__Bao8o > p").textContent;
        const price = document.querySelector("div.styles_product-header__price--cwyp-original__S2s3m").textContent;
    });

    
    console.log(productInfo.image);
    console.log(productInfo.name);
    console.log(productInfo.price);
    await browser.close();
    //return productURL;
}
everlaneProduct(everlaneURL);

/*const honestProduct = async(everlaneURL) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(firstURL, {waitUntil: 'domcontentloaded'});

    const productURL = await page.evaluate(() => {
        const firstLink = document.querySelector("#gf-products > div:nth-child(1) > div > div > a");
        return firstLink ? firstLink.href : null;
    });
    
    console.log(productURL);
    await browser.close();
    return productURL;
}
    */