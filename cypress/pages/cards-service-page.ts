import { CardsServiceText } from "@typings/cards-service";
import { BasePage } from "./base-page";

export class CardsServicePage extends BasePage {
  private standardOption = "div";

  public selectStandard(): void {
    cy.contains(this.standardOption, CardsServiceText.STANDARD_LABEL).click();
  }
}
