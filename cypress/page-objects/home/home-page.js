import {PageObject} from "../page-object";
import {ConnectWalletModalFragment} from "./connect-wallet-modal-fragment";

export class HomePage extends PageObject {
  constructor() {
    super('/');
  }

  connectWalletModal() {
    return new ConnectWalletModalFragment();
  }
}
