import { BasePage } from "./base-page";
import { CardsSubgradeDetailsText } from "@typings/cards-subgrades-details";

export class CardsSubgradesDetailsPage extends BasePage {
  private standardSubmitNowCard = '[data-test-id="flip-front-card-1"]';
  private cardSearchInput = 'input[type="text"][placeholder^="i.e"]';
  private dropdownItem = ".dropdown-item";
  private cardBody = ".card-body";
  private oversizedCheckbox = '[data-test-id="0-oversized"]';

  private getQuantitySelector(index: number): string {
    return `#quantity${index}`;
  }

  private getValueSelector(index: number): string {
    return `#value${index}`;
  }

  public clickSubmitNow(): void {
    cy.get(this.standardSubmitNowCard).within(() => {
      cy.contains("a", CardsSubgradeDetailsText.SUBMIT_NOW_LABEL).click();
    });
  }

  public clickContinueButton(): void {
    cy.get(this.continueButton).click();
  }

  public addCardByName(name: string): void {
    cy.get(this.cardSearchInput).should("be.visible").clear().type(name);

    cy.contains(this.dropdownItem, name).should("be.visible").click();
    cy.contains(this.cardBody, name).should("be.visible");
  }

  public setQuantity(index: number, quantity: number): void {
    cy.get(this.getQuantitySelector(index))
      .should("be.visible")
      .clear()
      .type(quantity.toString());
  }

  public setDeclaredValue(index: number, value: number): void {
    cy.get(this.getValueSelector(index))
      .should("be.visible")
      .clear()
      .type(value.toString());
  }

  public checkOversized(): void {
    cy.get(this.oversizedCheckbox).check();
  }
}
