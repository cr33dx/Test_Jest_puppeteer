import "@babel/polyfill"
const puppet = require('puppeteer')
var width = 1920, height = 1080
var page
var browser

        //############################################Read Me ##################################################
        // To get text content use evaluate i.e same as eval 1st param is func 2nd param is args to be passed.
        //const text = await page.evaluate((x)=>x.textContent, x)
        //use page.evaluate to run js
        //######################################################################################################

//Tear Down Runs before all test
//Pass done as callback to confirm everyting inside beforeAll went through, 30 seconds call back if done() not called, test fails

jest.setTimeout(10000)
describe('Login page Tests',()=>{   
    beforeAll(async (done)=>{
        browser = await puppet.launch({
            headless : false,
            args: [`--window-size=${width},${height}`],
            slowMo :20
        })
        page = await browser.newPage()
        await page.setViewport({width, height})
        await page.goto('https://bots-ui-test.apps.actionable-science.com/login')
        
        done()
    },30000)

    afterAll(async ()=>{
        await browser.close()
    })

    test('Check if page is loading ',()=>{
        expect(page.url()).toEqual('https://bots-ui-test.apps.actionable-science.com/login')
    })

    test('check if email is complete',async (done)=>{
        await page.type("input[name=username]", "test@test.com")
        await page.click('button[type=submit]')
        //let x = await page.waitFor('//*[@id="app"]/div/div/div[1]/section/div/div/div/div/div[2]/form/div[1]/p') <- xpath
        //console.log(text)
        let x = await page.$('#app > div > div > div.new-login > section > div > div > div > div > div.login-frame > form > div:nth-child(1) > p')
        let flag = 0
        if(x != null){flag = 1}
        expect(flag).toEqual(0)  
        done()

    })

    test('check if password is not typed in', async(done)=>{
        await page.reload({waitUntil:'load'})
        let flag = 0
        await page.type('input[name=password]','test')
        await page.click('button[type=submit]')
        let x = await page.$("#app > div > div > div.new-login > section > div > div > div > div > div.login-frame > form > div.md-form.info-icon.has-error > p")
        //await page.evaluate((x)=>console.log(x.textContent),x)
        x != null?flag=1:null;
        expect(flag).toEqual(0)
       // await page.waitFor(3000)
        done()
    })

    test('if username or password is incorrect and it is getting detected', async(done)=>{
        await page.waitFor(3000)
        await page.click('input[name=password]',{clickCount:3})
        await page.type('input[name=username]', 'helloworld@gmail.com')
        await page.type('input[name=password]', 'helloworld')
        await page.click('button[type=submit]')
        let x = await page.$('#app > div > div > div.new-login > section > div > div > div > div > div.login-frame > form > div.alert.alert-danger')
        let flag = 0
        x==null?flag=1:null
        expect(flag).toEqual(1)
        done()
    })
    test('if username or password is correct and logs in', async(done)=>{
        await page.click('input[name=username]',{clickCount:3})
        await page.click('input[name=password]',{clickCount:3})
        await page.type('input[name=username]', 'rti.testjames@yopmail.com')
        await page.type('input[name=password]', 'admin123')
        await page.click('button[type=submit]')
        await page.waitForNavigation({waitUntil:'load'})
        expect(page.url()).toEqual('https://bots-ui-test.apps.actionable-science.com/dashboard')
        done()
    })
})