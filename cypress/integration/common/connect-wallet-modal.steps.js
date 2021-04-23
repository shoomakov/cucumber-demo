import {Then, When} from "cypress-cucumber-preprocessor/steps";
import {ConnectWalletModalFragment} from "../../page-objects/home/connect-wallet-modal-fragment";

const connectWalletModal = new ConnectWalletModalFragment();

const walletWithName = ($name) => connectWalletModal.walletName().contains($name);

When('I see wallet name {string} in modal', walletName => {
  walletWithName(walletName).should("exist");
});

Then('I see wallet description is {string}', description => {
  connectWalletModal.walletDescription().text().should('contain', description);
});

Then('I click on {string} name', (walletName) => {
  walletWithName(walletName).click({ force: true }).wait(10000);
});

When('I disconnect from wallet', () => {
  connectWalletModal.disconnect();
});

When('I close connect modal', () => {
  connectWalletModal.close();
});

Then(`I don't see connect modal`, () => {
  connectWalletModal.verifyMainElement();
});
