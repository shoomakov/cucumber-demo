export class FragmentObject {
  /**
   * General element, wrapped by default
   * @protected
   */
  mainElement

  /**
   * Fragment object
   * @param {string} name - Selector name
   */
  constructor(name) {
    this.mainElement = name
  }

  wrap() {
    return cy.get(this.mainElement)
  }

  verifyMainElement() {
    this.wrap().should('be.visible', {
      message: `"${this.mainElement}" is not visible`,
    })

    return this
  }
}
