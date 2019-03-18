require('dotenv').config()
import "@babel/polyfill"
const fetch = require('node-fetch')
const puppet = require('puppeteer')
var width = 1920, height = 1080
var page
var browser
describe('test for env',async()=>{
    let fetc = async _=>{
        let fc = await fetch("https://apigateway-service-test.apps.actionable-science.com/api/v1/cfb2836e-26da-46fa-ab57-f3ddd9360b5a/train?$filter=status eq 'Active'&$top=1&$orderby=id desc",{
            method:'get',
            headers: new fetch.Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.auth_token}` 
            })
        })
        let data = await fc.json()
        console.log(JSON.stringify(data, null, "\t"))
        return data[0].utterance
    }
    beforeAll(async (done)=>{
        browser = await puppet.launch({
            headless : false,
            args: [`--window-size=${width},${height}`],
            slowMo :20
        })
        page = await browser.newPage()
        await page.setViewport({height:700, width:1500})
        await page.goto('https://m9191.test.virtualpeople.ai/tryoutpublic/cfb2836e-26da-46fa-ab57-f3ddd9360b5a')
        
        done()
    },50000)
    test('test for ',async(done)=>{
        let quest = 'fafasfsfsfasff'
        await page.waitFor(3000)
        await page.click('#appendedConsole')
        await page.waitFor(4000)
        await page.type('.wc-shellinput',quest)
        await page.click('.wc-send')
        let data = await fetc()
        expect(data).toEqual(quest)
        done()
},10000)
})
