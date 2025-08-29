import { BasePage } from "./base-page";
import { ReviewText } from "@typings/review";

export class ReviewPage extends BasePage {
  private cardByIndex = (index: number) => `[data-test-id="card-${index}"]`;
  private tosCheckbox = "#checked-tos";
  private expirationCheckbox = "#checked-expiration";
  private newsletterCheckbox = "#checked-newsletter";
  private freeText = "p.free-text";
  private checkoutButton = "button.btn-primary";

  private getCardContainer(index: number) {
    return cy.get(this.cardByIndex(index));
  }

  public clickCheckout(): void {
    cy.contains(this.checkoutButton, ReviewText.CHECKOUT_LABEL).click();
  }

  public getCardName(index: number) {
    return this.getCardContainer(index).find("p.fs-5");
  }

  public getQuantity(index: number) {
    return this.getCardContainer(index)
      .contains(".tableData", ReviewText.QUANTITY_LABEL)
      .next(".tableValue");
  }

  public getDeclaredValue(index: number) {
    return this.getCardContainer(index)
      .contains(".tableData", ReviewText.DECLARED_VALUE_LABEL)
      .next(".tableValue");
  }

  public getExtras(index: number) {
    return this.getCardContainer(index)
      .contains(".tableData", ReviewText.EXTRAS_LABEL)
      .next(".tableValue");
  }

  public clickAcceptTerms(): void {
    cy.get(this.tosCheckbox).check({ force: true });
  }

  public clickAcceptExpirationPolicy(): void {
    cy.get(this.expirationCheckbox).check({ force: true });
  }

  public clickNewsletter(): void {
    cy.get(this.newsletterCheckbox).check({ force: true });
  }

  public getName(fullName: string) {
    return cy.contains(this.freeText, fullName);
  }

  public getEmail(email: string) {
    return cy.contains(this.freeText, email);
  }

  public getPhone(phone: string) {
    return cy.contains(this.freeText, phone);
  }

  public getStreet(street: string) {
    return cy.contains(this.freeText, street);
  }

  public getState(state: string) {
    return cy.contains(this.freeText, state);
  }

  public getCityAndZip(city: string, zip: string) {
    return cy.contains(this.freeText, `${city} ${zip}`);
  }

  public getCountry(country: string) {
    return cy.contains(this.freeText, country);
  }
}
