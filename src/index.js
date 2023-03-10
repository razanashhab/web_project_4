import "./styles/index.css";
import { Card } from "./Card.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";

import {
    formValidators,
    profileName,
    profileDescription,
    initialCards,
    profileEditButton,
    nameText,
    aboutmeText,
    cardCreationButton,
    element,
} from "./constants.js";

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, config);
        // here you get the name of the form
        const formName = formElement.getAttribute("name");

        // here you store a validator by the `name` of the form
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
});

const renderUserProfileInfo = new UserInfo({
    userName: profileName,
    userJob: profileDescription,
});

renderUserProfileInfo.setUserInfo({
    name: "Jacques Cousteau",
    job: "Explorer",
});

const renderCardList = new Section({
        data: initialCards,
        renderer: (item) => {
            const card = new Card({ imgLink: item.link, title: item.name },
                "#template"
            );
            const cardElement = card.generateCard();
            renderCardList.addItem(cardElement);
        },
    },
    ".element"
);
renderCardList.renderer();

//Profile Handler
profileEditButton.addEventListener("click", () => {
    const userInfo = renderUserProfileInfo.getUserInfo();
    nameText.value = userInfo.userName;
    aboutmeText.value = userInfo.userJob;

    const profileForm = new PopupWithForm("#editProfile", (formData) => {
        // we'll add the function code in a moment
        renderUserProfileInfo.setUserInfo({
            name: formData.name,
            job: formData.aboutme,
        });
    });
    profileForm.setEventListeners();
    profileForm.open();
});

//card creation handler
cardCreationButton.addEventListener("click", () => {
    const addCardForm = new PopupWithForm("#createCardPopup", (formData) => {
        const cardObj = new Card({ imgLink: formData.imagelink, title: formData.title },
            "#template"
        );
        const newCard = cardObj.generateCard();
        element.prepend(newCard);
        formValidators[createCardForm.getAttribute("name")].resetValidation();
    });
    addCardForm.setEventListeners();
    addCardForm.open();
});