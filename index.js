const puppeteer = require('puppeteer-core');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require("qrcode-terminal");
const link = "https://www.dyson.com.tr/products/cord-free/dyson-v15-detect/overview";
const webSide = "https://www.dyson.com.tr/products/hair-care/dyson-corrale/overview";



(async function () {

    const qrcode = require('qrcode-terminal');

    const { Client } = require('whatsapp-web.js');
    const client = new Client({
        authStrategy: new LocalAuth()
    });

    await  client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });

    await client.on('ready', () => {
        console.log('Client is ready!');
    });

    await client.initialize();



    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: [`--window-size=1920,1080`],
    });
    let context = browser.defaultBrowserContext();
    await context.overridePermissions(URL, ['clipboard-read', 'clipboard-write']);
    let page = await browser.newPage();
    /*
        await page.setDefaultNavigationTimeout(900000);
    */
    await page.goto(webSide, {waitUntil: 'networkidle0'});
    try {
        // '.my-element' sorgu dizesine uyan elementi bekleyin ve seçin
        const element = await page.waitForXPath('//button[@title="Sepete Ekle"]');
            console.log('Client is ready!');
        const text = "Dyson stoğa geldi. Bu Linkten direk ulaşabilirsin \n"+link+" Deneme için bu 😊";

        const numbers = "+905339652875";
        const chatIds = numbers.substring(1) + "@c.us";
        await client.sendMessage(chatIds, text);
        const numbert = "+905380513775";
        const chatIdt = numbert.substring(1) + "@c.us";
        await client.sendMessage(chatIdt, text);
        const numbery = "+905537602841";
        const chatIdy = numbery.substring(1) + "@c.us";
        await client.sendMessage(chatIdy, text);
        console.log(element);
    } catch (error) {
        console.error(error);
    }
    await browser.close();
})();


/*giriş yapma ve cookie ile giriş yapma, verileri geçersiz ise login yaptırma*/
   /* let cookiesString = await fs.readFile('./cookies.json');
    let cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);
    await Promise.all([
        page.waitForNavigation(),
        await page.reload(),
    ]);

    if (await page.$(addListing.listingsSelect) == null) {
        await page.waitForSelector(selectors.pageUploadControl);
        let [loginButton] = await page.$x(selectors.loginButton);
        await page.waitForXPath(selectors.loginButtonActive);
        await loginButton.click();
        await page.type("#adminlogin", mail, {delay: 0});
        await page.type("#adminpassword", pass, {delay: 0});
        await Promise.all([
            await page.click('.login'),
            page.waitForNavigation({waitUntil: 'networkidle2'})
        ]);
        let cookie = await page.cookies();
        await fs.writeFile('./cookies.json', JSON.stringify(cookie, null, 2));
    }

    /!*navbar da gereklşi kısma tıklama*!/
    await page.waitForSelector(addListing.navbarControl);
    await page.click(addListing.navbarControl);
    await page.waitForTimeout(2000);
    await page.waitForXPath(addListing.manageLeads);
    let [buttons] = await page.$x(addListing.manageLeads);
    await buttons.click();
    console.log('-------------------------------2----------------------------------------');

    await page.waitForTimeout(2000);
    await page.waitForSelector(addListing.bayutLeads);
    await page.click(addListing.bayutLeads);

    await page.waitForTimeout(2000);
    await page.waitForXPath(addListing.body);
    let pageCount = (await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".pull-left.pagination > a")).map(x => x.textContent.replace(/[^0-9\.]+/g, ""))
        }
    )).filter(function (entry) {
        return entry.trim() !== '';
    });

    console.log(pageCount);
    for (let i = 1; i <= pageCount.length; i++) {
        await page.waitForTimeout(2000);
        await page.waitForXPath(addListing.body);
        await page.waitForTimeout(4000);
        console.log('-----------------------------3------------------------------------------');


        let names = await page.evaluate(() => {
                return Array.from(document.querySelectorAll(".data-copy")).map(x => x.textContent)
            }
        )
        console.log('----------------------------4-------------------------------------------');

        let id = await page.evaluate(() => {
                return Array.from(document.querySelectorAll("#lead_id-w > a.ref_index.tooltips")).map(x => x.textContent.trim())
            }
        )
        console.log('-----------------------------5------------------------------------------');
        let formatted = names.map((item, key) => {
            return `${id[key]} - ${item.replace(/Email|LEAD INFO:Name - |Mobile|LEAD DETAILS:Property Reference|Property Link|Purpose|/g, '').replace(/LEAD DETAILS.*Link/g, '').replace(/.- 3028.*- https/g, '- https').replace(/.html.*Purpose/g, '').replace(/Type/g, '').replace(/Area.*Location/g, '')}`
        })
        const orjinalId = (await page.evaluate(
            () => Array.from(
                document.querySelectorAll('#lead_id-w > a.ref_index.tooltips'),
                a => a.getAttribute('data-original-title')
            )
        ));
        console.log('-----------------------------6------------------------------------------');

        let orjinalIds = formatted.map((item, key) => {
            return `${orjinalId[key]} - ${item}`
        })
        await fs.appendFile("names.txt", orjinalIds.join("\r"\n));

        await page.screenshot({
            path: 'screenshot.jpg'
        });
        console.log('-----------------------------8-----------------------' + pageCount[i] + '------------------');
        if (pageCount[i]) {
            let [pageButton] = await page.$x("//a[normalize-space()='" + pageCount[i] + "']");
            await pageButton.click();
        }
        console.log('-----------------------------9------------------------------------------');

    }*/

