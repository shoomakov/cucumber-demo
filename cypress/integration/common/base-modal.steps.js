import {When, Then} from "cypress-cucumber-preprocessor/steps";
import {BaseModalFragment} from "../../page-objects/home/base-modal-fragment";

const baseModal = new BaseModalFragment();

When('I see base modal', walletName => {
  baseModal.verifyMainElement();
});

Then('I type {string} in base modal', value => {
  baseModal.fillValue(value);
});

Then('I submit a value by click on {string}', name => {
  baseModal.baseButton().contains(name).click({ force: true }).wait(5000);
});

Then('I see base modal with title {string}', (title) => {
  baseModal.headerTitle().text().should('contain', title);
});
