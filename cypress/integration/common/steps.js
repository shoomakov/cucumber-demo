/// <reference types="cypress" />

import {
  Given, Then, And
} from 'cypress-cucumber-preprocessor/steps';
import {HomeMarketsFragment} from "../../page-objects/home/home-markets-fragment";

const homeMarkets = new HomeMarketsFragment();

Given(/^I am on home page$/, function () {
  cy.visit('https://ledger-stage.unfederalreservetesting.com/')
    .wait(3000)
});

And('I unlock my wallet plugin', () => {
  cy.task('unlockWallet', Cypress.env('PLUGIN_PASSWORD'));
});

Then('I see button "Unlock wallet"', () => {
  cy.get('#connectButton').should('be.visible');
});

When('I click on user supply market', () => {
  homeMarkets.supplyUserMarket().within(() => {
    homeMarkets.marketItem().click({ force: true });
  });
});

When('I click on user borrow market', () => {
  homeMarkets.borrowUserMarket().within(() => {
    homeMarkets.marketItem().click({ force: true });
  });
});

Then('I confirm transaction', () => {
  cy.task('confirmTransaction');

  cy.task('getCurrency').then(console.log);
});
