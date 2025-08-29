import { BaseComponent } from "./base-component";

export class LoginModalComponent extends BaseComponent {
  private continueAsGuestButton = "button.btn.btn-outline-primary";

  constructor() {
    super(".modal-body");
  }

  public clickContinueAsGuest(): void {
    this.safeClick(this.continueAsGuestButton);
  }
}
