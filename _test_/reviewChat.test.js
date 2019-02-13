import "@babel/polyfill"
import puppet from "puppeteer"
var page
var browser
let count
var width = 1500, height = 900

jest.setTimeout(20000)
describe('testing for review chat page', ()=>{
    async function openUpBot(){
        const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())))
        await page.click('a.to-btn')
        return(await newPagePromise)
    }
    async function checkFlag(){
        return (await page.evaluate(()=>{
            flag = 0
            let x = document.getElementsByClassName('form-check-input')
            for(i=0;i<x.length;i++){
                if(x[i].getAttribute('checked')==null)flag = 1
            }
            return flag
        }))
    }
    async function checkByClrfilter(filter){
    return(await page.evaluate((title)=>{
            flag = 0
            let x = document.getElementsByClassName('performance')
            for(i=0;i<x.length;i++){
                if(x[i].children[1].children[0].getAttribute('class')!= title){
                    flag = 1
                }
            }
            return flag
        },filter))
    }
    async function filterdd(title){
        await page.waitFor(2000)
        await page.click('button.nav-link')
            switch (title){
            case 'flagged' :{
                await page.click('#root > div > div > div > div.main > div > div > div.main-section > div:nth-child(1) > div:nth-child(1) > div > div > div > button:nth-child(2)')
                await page.waitFor(2000)
                break
            }
            case 'notflagged' :{
                await page.click('#root > div > div > div > div.main > div > div > div.main-section > div:nth-child(1) > div:nth-child(1) > div > div > div > button:nth-child(3)')
                await page.waitFor(2000)
                break
            }
        }
    }
    async function filterclr(title){
        await page.waitFor(2000)
        switch(title){
            case('red'):{
                await page.click('span.red')
                await page.waitFor(2000)
                break
            }
            case('amber'):{
                await page.click('span.amber')
                await page.waitFor(2000)
                break
            }
            case('green'):{
                await page.click('span.green')
                await page.waitFor(2000)
                break
            }
        }
    }

    beforeAll(async ()=>{
        browser = await puppet.connect({
            browserWSEndpoint : 'ws://localhost:9229/devtools/browser/5accc8b7-52ac-4a5b-996b-944603321a88',
            headless : false,
            args: [`--window-size=${width},${height}`],
            slowMo :20,
            devtools:true
        })
        page = await browser.newPage()
        await page.setViewport({width, height})
        await page.goto('https://emmabot3409.apps-test.virtualpeople.ai/review-chat',{waitUntil:'load'})
    })
    test('checking if all names are anon ', async (done)=>{
        await page.waitFor(3000)
        let flag = await page.evaluate(()=>{
            flag = 0
            x = document.getElementsByClassName('chat-list')[0].children
            for(i=0;i<x.length;i++){
                if(x[i].children[0].children[1].textContent!="Anonymous")flag = 1            
            }
            return flag
        })
        expect(flag).toEqual(0)
        done()
    })

    test.skip('if clicking eye button opens up modal', async (done)=>{
        await page.waitFor(3000)
        await page.click('i.fa-eye')
        await page.waitFor(2000)
        await page.click('body > div:nth-child(6) > div > div.modal.fade.show > div > div > div > div > div.flag-togle.clearfix > span > label > span.switch-label')
        await page.waitFor(3000)
        await page.click('i.fa-close')
        expect(1).toEqual(1)
        done()
    })
    test.only('open up bot', async (done)=>{
        await page.waitFor(5000)
        let popup = await openUpBot()
        await popup.waitFor(10000)
        await popup.click('a.startCon')
        await popup.waitFor(2000)
        await popup.type('input.wc-shellinput', 'can i bring pets to work')
        await popup.click('#resizable > div > div.wc-console > label.wc-send')
        await page.waitFor(3000)
        await page.click('div.wc-message.wc-message-from-bot > div > div > div.wc-list > div > div > div:nth-child(3) > div:nth-child(1) > div > button:nth-child(1)')
        done()
    },30000)

    test('flagged filter checker',async (done)=>{
        await page.reload({waitUntil:'load'})
        await page.waitFor(3000)
        await filterdd('flagged')
        expect(await checkFlag()).toEqual(0)
        done()
    })
    test('testing red color filter',async (done)=>{
        await page.reload({waitUntil:'load'})
        await page.waitFor(3000)
        await filterclr('red')
        expect(await checkByClrfilter('red')).toEqual(0)
        done()
    })
    test('testing green color filter',async (done)=>{
        await page.reload({waitUntil:'load'})
        await page.waitFor(3000)
        await filterclr('green')
        expect(await checkByClrfilter('green')).toEqual(0)
        done()
    })
    test('testing amber color filter',async (done)=>{
        await page.reload({waitUntil:'load'})
        await page.waitFor(3000)
        await filterclr('amber')
        expect(await checkByClrfilter('amber')).toEqual(0)
        done()
    })
    describe('testing variations',()=>{
        test('testing flagged with red filter',async(done)=>{
            await page.reload({waitUntil:'load'})
            await page.waitFor(3000)
            await filterdd('flagged')
            await page.waitFor(3000)
            await filterclr('red')
            expect(await checkFlag()).toEqual(0)
            expect(await checkByClrfilter('red')).toEqual(0)
            done()
        })
        test('testing flagged with green filter',async(done)=>{
            await page.reload({waitUntil:'load'})
            await page.waitFor(3000)
            await filterdd('flagged')
            await page.waitFor(3000)
            await filterclr('green')
            expect(await checkFlag()).toEqual(0)
            expect(await checkByClrfilter('green')).toEqual(0)
            done()
        })
        test('testing flagged with amber filter',async(done)=>{
            await page.reload({waitUntil:'load'})
            await page.waitFor(3000)
            await filterdd('flagged')
            await page.waitFor(3000)
            await filterclr('amber')
            expect(await checkFlag()).toEqual(0)
            expect(await checkByClrfilter('amber')).toEqual(0)
            done()
        })
        test('testing Unflagged with red filter',async(done)=>{
            await page.reload({waitUntil:'load'})
            await page.waitFor(3000)
            await filterdd('notflagged')
            await page.waitFor(3000)
            await filterclr('red')
            expect(await checkFlag()).toEqual(1)
            expect(await checkByClrfilter('red')).toEqual(0)
            done()
        })
        test('testing Unflagged with green filter',async(done)=>{
            await page.reload({waitUntil:'load'})
            await page.waitFor(3000)
            await filterdd('notflagged')
            await page.waitFor(3000)
            await filterclr('green')
            expect(await checkFlag()).toEqual(1)
            expect(await checkByClrfilter('green')).toEqual(0)
            done()
        })
        test('testing Unflagged with amber filter',async(done)=>{
            await page.reload({waitUntil:'load'})
            await page.waitFor(3000)
            await filterdd('notflagged')
            await page.waitFor(3000)
            await filterclr('amber')
            expect(await checkFlag()).toEqual(1)
            expect(await checkByClrfilter('amber')).toEqual(0)
            done()
        })
    })
})