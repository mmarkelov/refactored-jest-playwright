beforeAll(async () => {
    await page.goto('https://google.com/')
})

it('Google',  async(done) => {
    const title = await page.title()
    expect(title).toBe('Google')
    done()
})

it('Google input',  async(done) => {
    await page.type('input[name=q]', 'Playwright', {delay: 100});
    const input = await page.$eval('input[name=q]', element => element.value);
    expect(input).toBe('Playwright')
    done()
})
