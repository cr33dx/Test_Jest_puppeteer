const puppeteer = require('puppeteer')


var app = 'https://bots-ui-test.apps.actionable-science.com/'

const name = 'hero'
const lastname = 'khan'
let browser
const width = 1920;
const height = 1080;
beforeAll( ()=>{
    browser =  puppeteer.launch({
        headless: false,
        slomo : 80,
        args: [`--window-size=${width},${height}`]
    })
    page = browser.newPage()
     page.setViewport({width, height})

})

afterAll(()=>{
    browser.close()
})

describe("test for title", ()=>{
    test("if title has text",async ()=>{

    })
})