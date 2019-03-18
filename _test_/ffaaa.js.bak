const puppet = require('puppeteer')
var width = 1400, height = 1080
async function name (){
browser =  await puppet.connect({
        browserWSEndpoint : 'ws://localhost:9229/devtools/browser/fd8c31e0-33d1-4f07-b69a-f3cc787b3f50',
        headless : false,
        args: [`--window-size=${width},${height}`],
        slowMo :20
    })
    page = await browser.newPage()
    await page.setViewport({width, height})
    await page.goto('http://google.com',{waitUntil :'load'})
    await page.waitFor(1000)
    await page.waitFor('//*[@id="hplogo"]')
    await page.type('#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input', 'hello world')}

    test('work',()=>{name()})