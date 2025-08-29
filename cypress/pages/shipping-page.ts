import { ShippingAddress } from "@typings/shipping/shipping-types";
import { BasePage } from "./base-page";

export class ShippingPage extends BasePage {
  private firstName = "#firstName";
  private lastName = "#lastName";
  private email = "#email";
  private phone = "#phone";
  private country = "#country";
  private street = "#line1";
  private apt = "#line2";
  private city = "#city";
  private state = "#state";
  private zip = "#zipcode";

  private shippingInternational = "#shipping-International";

  public fillAddress(data: ShippingAddress): void {
    this.safeType(this.firstName, data.firstName);
    this.safeType(this.lastName, data.lastName);
    this.safeType(this.email, data.email);
    this.safeType(this.phone, data.phone);
    this.safeSelect(this.country, data.country);
    this.safeType(this.street, data.street);

    if (data.apt) {
      this.safeType(this.apt, data.apt);
    }

    this.safeType(this.city, data.city);
    this.safeSelect(this.state, data.state);
    this.safeType(this.zip, data.zip);
  }

  public selectInternationalShipping(): void {
    this.safeClick(this.shippingInternational);
  }

  public continue(): void {
    this.safeClick(this.continueButton);
  }
}
