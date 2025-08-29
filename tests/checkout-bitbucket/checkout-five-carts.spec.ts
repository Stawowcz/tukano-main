import { CardsSubgradesDetailsPage } from "@pages/cards-subgrades-details-page";
import { SubmitPage } from "@pages/submit-page";
import { LoginModalComponent } from "@components/proceed-login-component";
import {
  CardsNames,
  CardsSubgradeDetailsText,
} from "@typings/cards-subgrades-details";
import { Urls } from "cypress/contstants";
import { ShippingPage } from "@pages/shipping-page";
import { ShippingAddress } from "@typings/shipping";
import { DataGenerator } from "@utils/data-generator";
import { ReviewPage } from "@pages/review-page";
import { PaymentPage } from "@pages/payment-page";
import { PaymentText } from "@typings/payment";
import { ReviewText } from "@typings/review/";
import { CardsServicePage } from "@pages/cards-service-page";

describe(`[${Cypress.browser.name}] Beckett E2E Checkout Cards as Guest`, () => {
  const cardsSubgradesDetailsPage = new CardsSubgradesDetailsPage();
  const submitPage = new SubmitPage();
  const loginModalComponent = new LoginModalComponent();
  const shippingPage = new ShippingPage();
  const reviewPage = new ReviewPage();
  const paymentPage = new PaymentPage();
  const cardServicePage = new CardsServicePage();

  it("Should add 5 cards with quantity 1 and defined value", () => {
    submitPage.goToSite();
    submitPage.clickSubmit();
    submitPage.clickOnCards();
    loginModalComponent.clickContinueAsGuest();
    cardServicePage.selectStandard();
    cardsSubgradesDetailsPage.clickSubmitNow();

    cy.url().should("include", Urls.STANDARD_SUBGRADES_DETAILS);
    cy.contains(CardsSubgradeDetailsText.ADD_CARDS_HEADER).should("be.visible");

    const cards = [
      CardsNames.DEL_UNSER,
      CardsNames.TOM_HALL,
      CardsNames.JOHN_MILNE,
      CardsNames.HONUS_WAGNER,
      CardsNames.MAYBERRY,
    ];

    cards.forEach((card, index) => {
      const declaredValue = (index + 1) * 100;
      cardsSubgradesDetailsPage.addCardByName(card);
      cardsSubgradesDetailsPage.setQuantity(index + 1, 1);
      cardsSubgradesDetailsPage.setDeclaredValue(index + 1, declaredValue);
      if (index === 0) {
        cardsSubgradesDetailsPage.checkOversized();
      }
    });
    cardsSubgradesDetailsPage.clickContinueButton();

    const address: ShippingAddress = DataGenerator.generateShippingAddress();

    shippingPage.fillAddress(address);
    shippingPage.selectInternationalShipping();
    shippingPage.continue();

    reviewPage.getCardName(1).should("contain.text", CardsNames.MAYBERRY);
    reviewPage.getDeclaredValue(1).should("have.text", ReviewText.VALUE_500);
    reviewPage.getQuantity(1).should("have.text", ReviewText.QUANTITY_VALUE);
    reviewPage.getCardName(2).should("contain.text", CardsNames.HONUS_WAGNER);
    reviewPage.getDeclaredValue(2).should("have.text", ReviewText.VALUE_400);
    reviewPage.getQuantity(2).should("have.text", ReviewText.QUANTITY_VALUE);
    reviewPage.getCardName(3).should("contain.text", CardsNames.JOHN_MILNE);
    reviewPage.getDeclaredValue(3).should("have.text", ReviewText.VALUE_300);
    reviewPage.getQuantity(3).should("have.text", ReviewText.QUANTITY_VALUE);
    reviewPage.getCardName(4).should("contain.text", CardsNames.TOM_HALL);
    reviewPage.getDeclaredValue(4).should("have.text", ReviewText.VALUE_200);
    reviewPage.getQuantity(4).should("have.text", ReviewText.QUANTITY_VALUE);
    reviewPage.getCardName(5).should("contain.text", CardsNames.DEL_UNSER);
    reviewPage.getDeclaredValue(5).should("have.text", ReviewText.VALUE_100);
    reviewPage.getQuantity(5).should("have.text", ReviewText.QUANTITY_VALUE);
    reviewPage
      .getName(`${address.firstName} ${address.lastName}`)
      .should("be.visible");
    reviewPage.getEmail(address.email).should("be.visible");
    reviewPage.getPhone(address.phone).should("be.visible");
    reviewPage.getStreet(address.street).should("be.visible");
    reviewPage.getState(address.state).should("be.visible");
    reviewPage.getCityAndZip(address.city, address.zip).should("be.visible");
    reviewPage.getCountry(address.country).should("be.visible");

    reviewPage.clickAcceptTerms();
    reviewPage.clickAcceptExpirationPolicy();
    reviewPage.clickNewsletter();
    reviewPage.clickCheckout();

    cy.get(paymentPage.header).should("have.text", PaymentText.PAYMENT_HEADER);
    cy.get(paymentPage.title).should("have.text", PaymentText.PAYMENT_TITLE);
    cy.get(paymentPage.description).should(
      "have.text",
      PaymentText.PAYMENT_DESCRIPTION,
    );
  });
});
