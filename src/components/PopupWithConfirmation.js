import Popup from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(selector, submitter) {
        super(selector);
        this._submitter = submitter;
        this._form = this._popup.querySelector(".form");
        this._submitButton = this._form.querySelector(".form__submit");
        this._submitButtonTextContent = this._submitButton.textContent;
    }

    setCardId(card, cardId) {
        this._card = card;
        this._cardId = cardId;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._renderLoading(true);
            this._submitter(this._card, this._cardId);
            this.close();
            this._renderLoading(false);
        });
    }
    _renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Saving...";
        } else {
            this._submitButton.textContent = this._submitButtonTextContent;
        }
    }
}