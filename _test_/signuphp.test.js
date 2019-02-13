require("@babel/polyfill");
const puppet = require('puppeteer')
var config = require('config')
var signup = config.get('Signup')
console.log(signup)
const fs = require('fs')
var width = 1400, height = 1080
var page
var browser
var random = Math.floor(1000 + Math.random() * 9000)
var email = `emma_test${random}@yopmail.com`
var sname = signup.fname+signup.lname+random
fs.writeFileSync('../cred.txt',email)
import 'jest-dom/extend-expect'
jest.setTimeout(50000)
describe('Checking If User Gets Registered',()=>{
    beforeAll(async (done)=>{
        browser = await puppet.launch({
            //browserWSEndpoint : 'ws://localhost:9229/devtools/browser/fd8c31e0-33d1-4f07-b69a-f3cc787b3f50',
            headless : false,
            args: [`--window-size=${width},${height}`],
            slowMo :20,
            devtools:true
        })
        page = await browser.newPage()
        await page.setViewport({width, height})
        await page.goto(signup.url,{waitUntil:'load'})
        await page.type('input[id=companyName]',signup.company)
        await page.type('input[id=email]',email)
        await page.type('input[id=firstName]',signup.fname)
        await page.type('input[id=lastName]',signup.lname)
        await page.type('input[id=tenantId]',sname)
        await page.type('input[id=password]',signup.pass)
        await page.click('label[for=termsCondition]')
        await page.waitFor(5000)
        await page.click('button[id=next]')
        await page.waitFor(5000) //Read Docs
        await page.click('button.btn-primary')
        await page.waitFor(70000)
        await page.click('#root > div > div > main > div > div > div > div > div > div > div > div.steps.final-step.efl-main.clearfix > div > div.panel-separation.clearfix > div.panel-right > div > a')
        await page.waitForNavigation({waitUntil:'load'})
        done()
    },150000)
    
    afterAll(async()=>{
        await browser.close()
    })
    test('check if login works', async(done)=>{
        await page.waitFor(2000)
        let url = 'https://'+signup.fname+signup.lname+random+'.apps-test.virtualpeople.ai/dashboard'
        await page.type('input[name=username]',email)
        await page.type('input[name=password]',signup.pass)
        await page.click('input[type=submit]')
        await page.waitForNavigation({waitUntil:'load'})
        await page.waitFor(2000)
        expect(page.url()).toEqual(url)
        done()
    },40000)
})