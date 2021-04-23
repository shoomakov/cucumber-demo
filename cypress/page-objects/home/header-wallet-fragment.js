import {FragmentObject} from "../fragment-object";
import {ConnectWalletModalFragment} from "./connect-wallet-modal-fragment";

export class HeaderWalletFragment extends FragmentObject {
  static BALANCE = '.header-wallet__balance';
  static BALANCE_VALUE = '.header-wallet__balance-value';
  static ACCOUNT = '.header-wallet__account';


  constructor() {
    super('.header-wallet');
  }

  openConnectModal() {
    this.account().click({ force: true });

    return new ConnectWalletModalFragment();
  }

  balance = () => this.wrap().find(HeaderWalletFragment.BALANCE);

  balanceValue = () => this.balance().find(HeaderWalletFragment.BALANCE_VALUE);

  account = () => this.wrap().find(HeaderWalletFragment.ACCOUNT);

  tokenPiece = () => this.account().children('span');
}
