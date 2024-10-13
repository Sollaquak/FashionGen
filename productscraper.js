const puppeteer = require('puppeteer');

const urlScrape = async(firstURL) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(firstURL, {waitUntil: 'domcontentloaded'});


    }
}



const selectors = {

}

const selectorChart = {
    ''

}

const scrape = async(url, selectors) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'domcontentloaded'});
        
        const title = await page.$eval(selectors.title, el => el.textContent.trim());
        const price = await page.$eval(selectors.price, el => el.textContent.trim());
        const description = await page.$eval(selectors.description, el => el.textContent.trim());
        const material = await page.$eval(selectors.material, el => el.textContent.trim());

        console.log("Title:", title);
        console.log("Price:", price);
        console.log("Description:", description);
        console.log("Material:", material);

        await browser.close();
    
}

if selectors.empty() {
    console.error("No selectors detected.")
    process.exit(1);
}

urlScrape(firstURL);
scrape(url,selectors);