import { faker } from "@faker-js/faker";
import { ShippingAddress } from "@typings/shipping";

export class DataGenerator {
  static generateShippingAddress(
    overrides: Partial<ShippingAddress> = {},
  ): ShippingAddress {
    const base: ShippingAddress = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.helpers.replaceSymbols("+481########"),
      country: "Poland",
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: "Lower Silesian Voivodeship",
      zip: faker.helpers.replaceSymbols("##-###"),
    };
    return { ...base, ...overrides };
  }
}
