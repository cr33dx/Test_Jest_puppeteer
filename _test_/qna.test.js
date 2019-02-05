const puppet = require('puppeteer')
require('jest-dom/extend-expect')
var width = 1400, height = 1080
var page
var browser
var $ = require('jquery')

describe('test for qna pages',()=>{
//############################################################HELPER FUNCTIONS#########################################################################    
    async function search(title){
        //this function searches for given title and waits for .mq-card to show up
        await page.type('input[type=search]',title)
        await page.click('i.fa-search')
        await page.waitFor('//*[@id="kb-manage-qna"]/div[3]/section/div[1]/div/div')
    }

    async function openUpBot(){
        const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())))
        await page.click('a.to-btn')
        return(await newPagePromise)
    }
    async function filterClicker(filter){
        //this function clicks on diffrent filters i.e all, unpublished, published.
        await page.click('#kb-manage-qna > div.main-section > div > div.col-sm-8 > div.fiter-section > div:nth-child(1) > div > button')
        switch (filter){
            case 'all':
            await page.click('#kb-manage-qna > div.main-section > div > div.col-sm-8 > div.fiter-section > div:nth-child(1) > div > div > button:nth-child(1)')
            await page.waitFor('//*[@id="kb-manage-qna"]/div[2]/section/div[1]/div/div')
            break

            case 'published':
            await page.click('#kb-manage-qna > div.main-section > div > div.col-sm-8 > div.fiter-section > div:nth-child(1) > div > div > button:nth-child(2)')
            await page.waitFor('//*[@id="kb-manage-qna"]/div[2]/section/div[1]/div/div')
            break

            case 'unpublished':
            await page.click('#kb-manage-qna > div.main-section > div > div.col-sm-8 > div.fiter-section > div:nth-child(1) > div > div > button:nth-child(3)')
            await page.waitFor('//*[@id="kb-manage-qna"]/div[2]/section/div[1]/div/div')
            break
        }
    }
//######################################################INITALIZING BROWSER FOR RUNNING TEST CASES#######################################################
    beforeAll(async (done)=>{
        title = Math.random().toString(36).substr(2, 5)//necessary initialisation of title to be used as unique question        
        browser = await puppet.connect({
            browserWSEndpoint : 'ws://localhost:9229/devtools/browser/fd8c31e0-33d1-4f07-b69a-f3cc787b3f50',
            headless : false,
            args: [`--window-size=${width},${height}`],
            slowMo :20
        })
        page = await browser.newPage()
        await page.setViewport({width, height})
        await page.goto('https://federation-sts.apps.actionable-science.com/auth/realms/cucino/protocol/openid-connect/auth?client_id=adminui-service&redirect_uri=https%3A%2F%2Fcucino.apps-test.virtualpeople.ai%2Fdashboard&state=28f5b678-2d75-4ed0-829d-dca3822b26f0&response_mode=fragment&response_type=code&scope=openid&nonce=9dea62ea-b001-4085-8e3f-0814755dbbda',{waitUntil:'load'})
        //await page.type('input[name=username]','adminuser')
        //await page.type('input[name=password]','cucino@12345')
        //await page.click('input[type=submit]')
        //await page.waitForNavigation({waitUntil:'load'})
        done()
    },40000)

//########################################################TESTS BEGIN FROM HERE#########################################################################
    test('testing if qna opens up',async (done)=>{
        await page.waitFor('//*[@id="root"]/div/div/div/div[1]/div/nav/ul/li[2]/a')
        let elem = await page.$('#root > div > div > div > div.sidebar > div > nav > ul > li:nth-child(2) > a')
        await elem.click()
        expect(page.url()).toEqual('https://cucino.apps-test.virtualpeople.ai/qna')
        done()
    },30000)
/*
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

    test('publishing ans testing if flag is set to published',async (done)=>{
        //await page.reload({waitFor:'load'})
        await page.waitFor('//*[@id="kb-manage-qna"]/div[2]/div/div[2]/div[2]/button[2]')
        await page.click('#kb-manage-qna > div.main-section > div > div.col-sm-8 > div.download-section-add > button:nth-child(2)') //clicking train and publish button
        await page.waitFor(90000)
        await search(title)//calling function
        await page.click('#kb-manage-qna > div.main-section > div > div.col-sm-8 > div.fiter-section > div:nth-child(1) > div > button')//clicking filter
        await page.click('#kb-manage-qna > div.main-section > div > div.col-sm-8 > div.fiter-section > div:nth-child(1) > div > div > button:nth-child(2)')//clicking published filter
        await page.waitFor('//*[@id="kb-manage-qna"]/div[2]/section/div[1]/div/div')
        let flag = await document.evaluate(()=>{
            return document.querySelector('#kb-manage-qna > div.main-section > section > div:nth-child(1) > div > div > h4 > span').textContent
        })
        expect(flag).toEqual(title+'?')
        done()
    },150000)*/
    test('serach func',async ()=>{
        await page.waitFor('#root > div > div > header > ul > li.d-md-down-none.try-out-bot.nav-item > a')
        let popup = await openUpBot()
        console.log(popup.url())
        await popup.waitFor('div.wc-message>div>div>div>p')
        await popup.waitFor(1000)
        var text = await popup.evaluate(()=>{
            return document.querySelector('div.wc-message>div>div>div>p').textContent
        })
        expect(text).toEqual('I am Emma, your virtual assistant. Go ahead and ask me questions like –')
    },20000)
})

