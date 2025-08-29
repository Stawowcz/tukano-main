import { UiText } from "@typings/ui";
import { BasePage } from "./base-page";

export class SubmitPage extends BasePage {
  private cardsButton = "div.button-title";

  public clickOnCards(): void {
    cy.contains(this.cardsButton, UiText.CARDS).click();
  }
}
