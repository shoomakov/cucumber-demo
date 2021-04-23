export class PageObject {
  constructor(pathname) {
    this.pathname = pathname
  }

  navigate() {
    cy.visit(this.pathname)

    return this
  }

  verifyPathname() {
    cy.location('pathname').should('eq', this.pathname)

    return this
  }
}
