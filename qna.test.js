const puppet = require('puppeteer')
require('jest-dom/extend-expect')
var width = 1920, height = 1080
var page
var browser
var $ = require('jquery')

describe('test for qna pages',()=>{
    beforeAll(async (done)=>{
        title = Math.random().toString(36).substr(2, 5)        
        browser = await puppet.launch({
            headless : false,
            args: [`--window-size=${width},${height}`],
            slowMo :20
        })
        page = await browser.newPage()
        await page.setViewport({width, height})
        await page.goto('https://federation-sts.apps.actionable-science.com/auth/realms/cucino/protocol/openid-connect/auth?client_id=adminui-service&redirect_uri=https%3A%2F%2Fcucino.apps-test.virtualpeople.ai%2Fdashboard&state=e9cdbeb9-46c6-48e4-9fcf-ef1b0682e10d&response_mode=fragment&response_type=code&scope=openid&nonce=763ad1c4-9d2c-4d07-8f35-50aec035ed76')
        await page.type('input[name=username]','adminuser')
        await page.type('input[name=password]','cucino@12345')
        await page.click('input[type=submit]')
        await page.waitForNavigation({waitUntil:'load'})
        done()
    },50000)
    test('testing if qna opens up',async (done)=>{
        await page.waitFor('//*[@id="root"]/div/div/div/div[1]/div/nav/ul/li[2]/a')
        let elem = await page.$('#root > div > div > div > div.sidebar > div > nav > ul > li:nth-child(2) > a')
        await elem.click()
        expect(page.url()).toEqual('https://cucino.apps-test.virtualpeople.ai/qna')
        done()
    },30000)

    test('Modal is opening up and showing',async (done)=>{
        await page.waitFor('//*[@id="kb-manage-qna"]/div[2]/div/div[1]/div/span')
        let upload = await page.$('#kb-manage-qna > div.main-section > div > div.col-sm-4 > div > span')
        await upload.click()
        let check = page.$('body > div:nth-child(8) > div > div.modal.fade.show > div > div')
        flag = 0
        check==null?flag=1:null
        expect(flag).toEqual(0)
        done()
    })

    test('if adding duplicate data is being detected', async (done)=>{
        let title = 'gibberish'
        let decription = 'lmao lol huhu'
        await page.type('input[name=question]',title)
        await page.type('div[role=textbox]',decription)
        await page.click('button[type=submit]')
        let error = await page.$('body > div:nth-child(8) > div > div.modal.fade.show > div > div > div > form > div.alert.alert-danger')
        flag = 0
        error==null?flag=1:null
        
        expect(flag).toEqual(0)
        done()
    })
    test('adding unqiue data and checkin if it is unpublished',async()=>{
        await page.click('input[name=question]',{clickCount : 3})
        await page.type('input[name=question]',title)
        await page.click('button[type=submit]')
        await page.waitFor(2000)
        //Click Again because it wont submit
        await page.click('button[type=submit]')
        await page.waitFor(4000)
        await page.type('input[type=search]',title)
        await page.click('i.fa-search')
        await page.waitFor('//*[@id="kb-manage-qna"]/div[2]/section/div[1]/div/div/h4/span')
        let flag = await page.evaluate(()=>{
            return document.querySelector('#kb-manage-qna > div.main-section > section > div:nth-child(1) > div > div > h4 > span').textContent
        })
        expect(flag).toEqual(title+'?')
    },15000)

    test('publishing ans testing if flag is set to published',async ()=>{
        page.reload({waitUntil:'load'})
        console.log(title)
    })
})

