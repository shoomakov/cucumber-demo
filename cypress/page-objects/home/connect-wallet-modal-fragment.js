import {FragmentObject} from "../fragment-object";

export class ConnectWalletModalFragment extends FragmentObject {
  static WALLET_NAME = '.wallet__name';
  static WALLET_DESCRIPTION = '.wallet__description';
  static WALLET_DISCONNECT = '.wallet__disconnect';
  static CLOSE = 'button.vm-btn-close';

  constructor() {
    super('.connect-wallet-modal');
  }

  disconnect() {
    this.walletDisconnect().click({ force: true });

    return this;
  }

  close() {
    this.buttonClose().click({ force: true });

    return this;
  }

  walletName = () => this.wrap().find(ConnectWalletModalFragment.WALLET_NAME);

  walletDescription = () => this.wrap().find(ConnectWalletModalFragment.WALLET_DESCRIPTION);

  walletDisconnect = () => this.wrap().find(ConnectWalletModalFragment.WALLET_DISCONNECT);

  buttonClose = () => this.wrap().find(ConnectWalletModalFragment.CLOSE);
}
