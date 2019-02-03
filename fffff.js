const puppet = require('puppeteer')
var width = 1920, height = 1080
beforeAll(()=>{
    x()
})
let x = async function(){
    browser = await puppet.launch({
        headless : false,
        args: [`--window-size=${width},${height}`]
    })
    page = await browser.newPage()
    await page.setViewport({width, height})
    await page.goto('https://bots-ui-test.apps.actionable-science.com/login')
    await page.waitForNavigation({waitUntil : 'load'})
    await page.type("input[name=username]", "hello")
}

describe('test 1',()=>{
    test('check for user name and password',()=>{
        expect($('input[name=username]')).toEqual('hello')
    })
})