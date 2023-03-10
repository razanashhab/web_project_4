export default class Popup {
  constructor(selector) {
    this._selector = selector; //selector of the popup element
    this._popup = document.querySelector(this._selector);
    this._popupCloseButton = this._popup.querySelector(".popup__close-button");
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this._popup.classList.remove("popup_opened");
    }
  }

  _handleRemoteClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("mousedown", (evt) => {
      this._handleRemoteClickClose(evt);
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
}
