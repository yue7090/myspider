const puppeteer = require('puppeteer')
const log = require('log4js').getLogger('spider')
let browser = null;
let retryTimes = 10;

module.exports = {
    pageContent: async function (opt) {
        log.trace(browser)
        if (!browser) {
            log.trace(browser)
            let headless = opt.headless==false ? opt.headless:true
            log.trace('----browser launch----')
            const args = [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '-–disable-gpu',
                '-–disable-dev-shm-usage',
                '-–no-first-run',
                '-–no-zygote',
            ]
            let proxy = ''
            if (opt.proxy) {
                proxy = '--proxy-server=' + opt.proxy
                args.push(proxy)
            }
            
            browser = await puppeteer.launch({
                headless: headless,
                args: args,
                ignoreHTTPSErrors: true
            });
            process.on('exit', function () {
                if (browser) {
                    browser.close()
                }
            })
        }

        let page = await browser.newPage()

        let flag = false
        let retry = 0

        if (opt.retry) {
            retryTimes = opt.retry
        }
        do {
            if (retry > retryTimes) {
                log.error('----retrytimes:' + retry +' failed----')
                await page.close()
                await browser.close()
                return false
            }
            if( retry >= 0 && retry <= retryTimes )
            {
                log.info('----we have retry '+(retry+1)+' times----')
            }
            try {
                log.trace('----page goto :' + opt.url + '----')
                await page.goto(opt.url, { waitUntil: 'networkidle2' })
                log.trace('----page request :' + opt.url + ' finish----')
                flag = true
            } catch (error) {
                flag = false
                retry++
                log.fatal('----page request :' + opt.url + ' has error: ' + error.toString() + '----')
            }
        } while (!flag)
        let html = await page.content()
        await page.close()
        log.trace('----page && browser close----')
        return html
    }
}