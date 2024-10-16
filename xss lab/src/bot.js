// Some code stolen from https://github.com/dimasma0305/CTF-XSS-BOT

const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');

const CONFIG = {
    APPNAME: process.env.NAME,
    APPURL: process.env.URL,
    APPURLREGEX: process.env.REGEX,
    FLAG: process.env.FLAG,
    APPEXTENSIONS: (() => {
        const extDir = path.join(__dirname, 'extensions');
        const dir = [];
        fs.readdirSync(extDir).forEach(file => {
            if (fs.lstatSync(path.join(extDir, file)).isDirectory()) {
                dir.push(path.join(extDir, file));
            }
        });
        return dir.join(',');
    })(),
    APPBROWSER: process.env['BROWSER'] || 'chromium'
};

console.table(CONFIG);

function sleep(s) {
    return new Promise((resolve) => setTimeout(resolve, s));
}

const browserArgs = {
    headless: (() => {
        const is_x11_exists = fs.existsSync('/tmp/.X11-unix');
        if (process.env['DISPLAY'] !== undefined && is_x11_exists) {
            return false;
        }
        return true;
    })(),
    args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--no-gpu',
        '--disable-default-apps',
        '--disable-translate',
        '--disable-device-discovery-notifications',
        '--disable-software-rasterizer',
        '--disable-xss-auditor',
        ...(() => {
            if (CONFIG.APPEXTENSIONS === "") return [];
            return [
                `--disable-extensions-except=${CONFIG.APPEXTENSIONS}`,
                `--load-extension=${CONFIG.APPEXTENSIONS}`
            ];
        })(),
    ],
    ignoreHTTPSErrors: true
};

/** @type {import('playwright').Browser} */
let initBrowser = null;

async function getContext(){
    /** @type {import('playwright').BrowserContext} */
    let context = null;
    if (CONFIG.APPEXTENSIONS === "") {
        if (initBrowser === null) {
            initBrowser = await (CONFIG.APPBROWSER === 'firefox' ? firefox.launch(browserArgs) : chromium.launch(browserArgs));
        }
        context = await initBrowser.newContext();
    } else {
        context = await (CONFIG.APPBROWSER === 'firefox' ? firefox.launch({browserArgs}) : chromium.launch(browserArgs)).newContext();
    }
    return context
}

console.log("Bot started...");

module.exports = {
    name: CONFIG.APPNAME,
    urlRegex: CONFIG.APPURLREGEX,
    bot: async (urlToVisit) => {
        const context = await getContext()
        try {
            const page = await context.newPage();
            await context.addCookies([{
                name: "flag",
                httpOnly: false,
                value: CONFIG.FLAG,
                url: CONFIG.APPURL
            }]);

            console.log(`bot visiting ${urlToVisit}`);
            await page.goto(urlToVisit, {
                waitUntil: 'load',
                timeout: 10 * 1000
            });
            await sleep(5000);

            console.log("browser close...");
            return true;
        } catch (e) {
            console.error(e);
            return false;
        } finally {
            if (CONFIG.APPEXTENSIONS !== "") {
                await context.browser().close();
            } else {
                await context.close();
            }
        }
    }
};
