const puppeteer = require('puppeteer-core');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require("qrcode-terminal");
const link = "https://www.dyson.com.tr/products/cord-free/dyson-v15-detect/overview";
const webSide = "https://www.dyson.com.tr/products/cord-free/dyson-v15-detect/overview";

async function sendMessage(page,client) {
    try {
        // '.my-element' sorgu dizesine uyan elementi bekleyin ve seçin
        const element = await page.waitForXPath('//button[@title="Sepete Ekle"]');
        console.log(element);
        // Mesajı gönderin
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
    } catch (error) {
        console.error(error);
    }
}

(async function () {

    const qrcode = require('qrcode-terminal');

    const client = new Client({
        authStrategy: new LocalAuth()
    });

    await client.on('qr', qr => {
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
    /*
        await page.setDefaultNavigationTimeout(900000);
    */

    while (true) {
        await page.reload();
        await sendMessage(page,client);
        // 30 saniyede bir döngüyü tekrarlamaya yönlendirin
        setTimeout(function() {
// Döngü iç
            // Döngü içinde yapılacak işlemler burada yazılır
        }, 35000);
    }

    // await browser.close();
})();
