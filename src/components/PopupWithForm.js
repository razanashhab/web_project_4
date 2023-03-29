import Popup from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(selector, submitter) {
    super(selector);
    this._submitter = submitter;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
    this._submitButton = this._form.querySelector(".form__submit");
    this._submitButtonTextContent = this._submitButton.textContent;
  }
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._renderLoading(true);
      this._submitter(this._getInputValues());
      this.close();
      this._renderLoading(false);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonTextContent;
    }
  }
}
