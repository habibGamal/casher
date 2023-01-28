function luma(hex) {
  if (hex.startsWith('#')) {
    hex = hex.substring(1)
  }

  const rgb = parseInt(hex, 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
describe("Recording 12/17/2022 at 2:33:54 AM", () => {
  it("tests Recording 12/17/2022 at 2:33:54 AM", async () => {
    // await browser.setWindowSize(1903, 393)
    // await browser.url("http://127.0.0.1:1420/")
    // await expect(browser).toHaveUrl("http://127.0.0.1:1420/")
    await browser.$("#greet-input").click()
    await browser.$("#greet-input").setValue("sdfwr")
    await browser.performActions([{
      type: 'key',
      id: 'keyboard',
      actions: [{ type: 'keyDown', value: '' }]
    }])
    await browser.performActions([{
      type: 'key',
      id: 'keyboard',
      actions: [{ type: 'keyUp', value: '' }]
    }])
    await browser.debug()
  });
}
)