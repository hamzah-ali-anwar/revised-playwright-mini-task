// Page Locators

module.exports = {
    userName: 'input[id="username"]',
    userPassword: 'input[id="password"]',
    signInBtn: 'button[type="submit"]',
    heading: (text) => `h1:text("${text}")`
}