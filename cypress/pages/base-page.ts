/// <reference types="cypress" />

export abstract class BasePage {
  private submitButton = 'a[role="button"]';
  protected continueButton = '[data-test-id="order-summary"] #summary-button'

  protected safeType(selector: string, value: string) {
    cy.get(selector).should('be.visible').clear().type(value);
  }

  protected safeClick(selector: string) {
    cy.get(selector).should('be.visible').click();
  }

  protected safeSelect(selector: string, value: string) {
    cy.get(selector).should('be.visible').select(value);
  }

  protected safeCheck(selector: string) {
    cy.get(selector).should('be.visible').check();
  }

  public goToSite(): void {
    cy.visit('/');
  }

  public clickSubmit(): void {
    cy.get(this.submitButton).contains('Submit').click();
  }
}
