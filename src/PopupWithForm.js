import Popup from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(selector, submitter) {
        super(selector);
        this._submitter = submitter;
        this._form = this._popup.querySelector(".form");
    }
    _getInputValues() {
        this._inputList = this._form.querySelectorAll(".form__input");
        this._formValues = {};

        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitter(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    _handleProfileFormSubmit(inputList) {
        const userInfo = new UserInfo({
            userName: ".profile__name",
            userJob: ".profile__description",
        });
        userInfo.setUserInfo(inputList[0], inputList[1]);
        this.close();
    }
}