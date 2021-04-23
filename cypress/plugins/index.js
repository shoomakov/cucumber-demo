/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const puppeteer = require('puppeteer');
const cucumber = require('cypress-cucumber-preprocessor').default;
const { resolve } = require('path');

const metaMaskPath = resolve('cypress\\extensions\\meta-mask');

let debuggingPort;
let browser;
let pages;
let pluginPage;

async function closeBrowser() {
  await browser.close();

  return null;
}

async function getCurrency() {
  const text = await pluginPage.$('[data-testid="eth-overview__primary-currency"] > .currency-display-component__text');
  return await text.evaluate(node => node.innerText);
}

async function confirmTransaction() {
  await pluginPage.screenshot({ path: 'cypress/screenshots/open.png' });

  await pluginPage.click('[data-testid="home__activity-tab"]');
  await pluginPage.screenshot({ path: 'cypress/screenshots/after-click-tab.png' });

  await pluginPage.click('.transaction-list-item--unconfirmed');
  await pluginPage.screenshot({ path: 'cypress/screenshots/item--unconfirmed.png' });
  await pluginPage.waitFor(10000);
  await pluginPage.click('[data-testid="page-container-footer-next"]');
  await pluginPage.screenshot({ path: 'cypress/screenshots/next.png' });

  return null;
}

async function unlockPlugin(port, password) {
  browser = await puppeteer.connect({browserURL: `http://localhost:${port}`});
  pages = await browser.pages();

  pluginPage = await pages[0].title() === 'MetaMask' ? pages[0] : pages[1];
  await pluginPage.screenshot({ path: 'cypress/screenshots/screenshot.png' });
  await pluginPage.type('.MuiInput-input', password);
  await pluginPage.click('.MuiButton-label');
  await pluginPage.screenshot({ path: 'cypress/screenshots/screenshot2.png' });

  return null;
}


/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // https://github.com/cypress-io/cypress/issues/3633
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--disable-dev-shm-usage');
    }

    return launchOptions;
  });

  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--disable-site-isolation-trials');
    }

    if (browser.family === 'chromium' && browser.name !== 'electron') {
      // auto open devtools
      launchOptions.args.push('--auto-open-devtools-for-tabs')
      const existing = launchOptions.args.find(
        arg => arg.slice(0, 23) === '--remote-debugging-port',
      )
      debuggingPort = existing.split('=')[1]
    }

    launchOptions.extensions.push(metaMaskPath);

    return launchOptions;
  });

  on('file:preprocessor', cucumber());

  on('task', {
    async unlockWallet(password) {
      console.log('Debugging port is: ' + debuggingPort)
      return await unlockPlugin(debuggingPort, password);
    },
    async close() {
      return await closeBrowser();
    },
    async confirmTransaction() {
      return await confirmTransaction()
    },
    async getCurrency() {
      return await getCurrency();
    }
  })
}
