import {FragmentObject} from "../fragment-object";

export class HomeMarketsFragment extends FragmentObject {
  static USER_MARKET = '.TheUserMarket';

  static MARKET_ITEM = '.market-item';

  constructor() {
    super('.home__markets');
  }

  supplyUserMarket = () => this.userMarket().eq(0);

  borrowUserMarket = () => this.userMarket().eq(1);

  userMarket = () => this.wrap().find(HomeMarketsFragment.USER_MARKET);

  marketItem = () => cy.get(HomeMarketsFragment.MARKET_ITEM);
}
