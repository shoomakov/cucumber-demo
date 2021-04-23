import {FragmentObject} from "../fragment-object";

export class BaseModalFragment extends FragmentObject {
  static BASE_INPUT_WRAPPER = '.BaseInput';
  static TAB_ROW = '.tab-row';
  static BASE_BUTTON = '.BaseBtn';
  static BOTTOM_ROW = '.bottom-row';
  static CLOSE = '.vm-btn-close';
  static MODAL_HEADER_TITLE = '.modal-header-title';

  constructor() {
    super('#BaseModal');
  }

  fillValue(value) {
    this.input().type(value, { force: true });

    return this;
  }

  close() {
    this.buttonClose().click({ force: true });

    return this;
  }

  baseInputWrapper = () => this.wrap().find(BaseModalFragment.BASE_INPUT_WRAPPER);

  input = () => this.baseInputWrapper().children('input');

  tabRow = () => this.wrap().find(BaseModalFragment.TAB_ROW);

  baseButton = () => this.wrap().find(BaseModalFragment.BASE_BUTTON);

  bottomRow = () => this.wrap().find(BaseModalFragment.BOTTOM_ROW);

  buttonClose = () => this.wrap().find(BaseModalFragment.CLOSE);

  headerTitle = () => this.wrap().find(BaseModalFragment.MODAL_HEADER_TITLE);
}
