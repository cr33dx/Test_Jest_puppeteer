const puppet = require('puppeteer')
const $ = require('jquery')
var width = 1920, height = 1080
var page
var browser
beforeAll(async (done)=>{
    browser = await puppet.launch({
        headless : false,
        args: [`--window-size=${width},${height}`]
    })
    page = await browser.newPage()
    await page.setViewport({width, height})
    await page.goto('https://bots-ui-test.apps.actionable-science.com/login')
    done()
},30000)

describe('test 1',()=>{
    test('check for user name and password',(done)=>{
        expect(page.url()).toEqual('https://bots-ui-test.apps.actionable-science.com/login')
        done()
    })

    test('check if email is complete',async (done)=>{
        await page.type("input[name=username]", "hwllogmailm")
        await page.click('button[type=submit]')
        //let x = await page.waitFor('//*[@id="app"]/div/div/div[1]/section/div/div/div/div/div[2]/form/div[1]/p') <- xpath
        let x = await page.$('#app > div > div > div.new-login > section > div > div > div > div > div.login-frame > form > div:nth-child(1) > p')
        // To get text content use evaluate i.e same as eval 1st param is func 2nd param is args to be passed.
        //const text = await page.evaluate((x)=>x.textContent, x)
        //console.log(text)
        let flag = 0
        if(x != null){flag = 1}
        expect(flag).toEqual(0)  
        done()

    })

    test('check if password is not typed in', async(done)=>{
        let flag = 0
        let x = await page.$("#app > div > div > div.new-login > section > div > div > div > div > div.login-frame > form > div.md-form.info-icon.has-error > p")
        await page.evaluate((x)=>console.log(x.textContent),x)
        x != null?flag=1:null;
        expect(flag).toEqual(0)
        done()
    })
})

