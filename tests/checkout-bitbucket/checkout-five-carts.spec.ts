import { CardsPage } from "@pages/carts-page";
import { SubmitPage } from "@pages/submit-page";
import { LoginModalComponent } from "@components/proceed-login-component";
import { CardNames } from "@typings/cart/cart-enums";
import { UiText } from "@typings/ui";
import { Urls } from "cypress/contstants";
import { ShippingPage } from "@pages/shipping-page";
import { ShippingAddress } from "@typings/shipping";
import { DataGenerator } from "@utils/data-generator";
import { ReviewPage } from "@pages/review-page";
import { PaymentPage } from "@pages/payment-page";


describe(`[${Cypress.browser.name}] Beckett E2E – Guest Checkout (Cards)`, () => {
  const cardsPage = new CardsPage();
  const submitPage = new SubmitPage();
  const loginModalComponent = new LoginModalComponent();
  const shippingPage = new ShippingPage()
  const reviewPage = new ReviewPage()
  const paymentPage = new PaymentPage()

  it("Should add 5 carts with quantity 1 and defined value", () => {
    submitPage.goToSite();
    submitPage.clickSubmit();
    submitPage.clickOnCards();
    loginModalComponent.clickContinueAsGuest();
    cardsPage.selectStandard();
    cardsPage.clickSubmitNow();

    cy.url().should("include", Urls.STANDARD_SUBGRADES_DETAILS);
    cy.contains(UiText.ADD_CARDS_HEADER).should("be.visible");

    const cards = [
      CardNames.DEL_UNSER,
      CardNames.TOM_HALL,
      CardNames.JOHN_MILNE,
      CardNames.HONUS_WAGNER,
      CardNames.MAYBERRY,
    ];

    cards.forEach((card, index) => {
      const declaredValue = (index + 1) * 100;

      cardsPage.addCardByName(card);
      cardsPage.setQuantity(index + 1, 1);
      cardsPage.setDeclaredValue(index + 1, declaredValue);

      if (index === 0) {
        cardsPage.checkOversized();
      }
    });
    cardsPage.clickContinueButton()

    const address: ShippingAddress = DataGenerator.generateShippingAddress();

    shippingPage.fillAddress(address);
    shippingPage.selectInternationalShipping();
    shippingPage.continue();
    reviewPage.getCardName(1).should("contain.text", CardNames.MAYBERRY);
    reviewPage.getDeclaredValue(1).should("have.text", UiText.VALUE_500);
    reviewPage.getCardName(2).should("contain.text", CardNames.HONUS_WAGNER);
    reviewPage.getDeclaredValue(2).should("have.text", UiText.VALUE_400);
    reviewPage.getCardName(3).should("contain.text", CardNames.JOHN_MILNE);
    reviewPage.getDeclaredValue(3).should("have.text", UiText.VALUE_300);
    reviewPage.getCardName(4).should("contain.text", CardNames.TOM_HALL);
    reviewPage.getDeclaredValue(4).should("have.text", UiText.VALUE_200);
    reviewPage.getCardName(5).should("contain.text", CardNames.DEL_UNSER);
    reviewPage.getDeclaredValue(5).should("have.text", UiText.VALUE_100);

    reviewPage.getName(`${address.firstName} ${address.lastName}`).should("be.visible");
    reviewPage.getEmail(address.email).should("be.visible");
    reviewPage.getPhone(address.phone).should("be.visible");
    reviewPage.getStreet(address.street).should("be.visible");
    reviewPage.getState(address.state).should("be.visible");
    reviewPage.getCityAndZip(address.city, address.zip).should("be.visible");
    reviewPage.getCountry(address.country).should("be.visible");
    reviewPage.clickAcceptTerms()
    reviewPage.clickAcceptExpirationPolicy()
    reviewPage.clickNewsletter()
    reviewPage.clickCheckout()

    cy.get(paymentPage.header).should("have.text", UiText.PAYMENT_HEADER);
    cy.get(paymentPage.title).should("have.text", UiText.PAYMENT_TITLE);
    cy.get(paymentPage.description).should("have.text", UiText.PAYMENT_DESCRIPTION);
    
  });
});
