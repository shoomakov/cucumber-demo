import {Then} from "cypress-cucumber-preprocessor/steps";
import {HeaderWalletFragment} from "../../page-objects/home/header-wallet-fragment";

const headerWallet = new HeaderWalletFragment();

Then('I see part of token in header', () => {
  const token = Cypress.env('TOKEN');

  headerWallet.tokenPiece().text()
    .should('contain', token.substring(0, 4));
});

Then('I click on header account', () => {
  headerWallet.openConnectModal();
});
