import { SubmitText } from "@typings/submit";
import { BasePage } from "./base-page";

export class SubmitPage extends BasePage {
  private cardsButton = "div.button-title";

  public clickOnCards(): void {
    cy.contains(this.cardsButton, SubmitText.CARDS_LABEL).click();
  }
}
