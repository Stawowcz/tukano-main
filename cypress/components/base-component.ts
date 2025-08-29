/// <reference types="cypress" />

export abstract class BaseComponent {
  protected root: string;

  constructor(root: string) {
    this.root = root;
  }

  private find(selector: string) {
    return cy.get(this.root).find(selector);
  }

  protected safeClick(selector: string): void {
    this.find(selector).should("be.visible").click();
  }
}
