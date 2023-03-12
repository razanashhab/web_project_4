import "./index.css";
import { Card } from "./../components/Card.js";
import { UserInfo } from "./../components/UserInfo.js";
import { FormValidator } from "./../components/FormValidator.js";
import { Section } from "./../components/Section.js";
import { PopupWithForm } from "./../components/PopupWithForm.js";
import { PopupWithImage } from "./../components/PopupWithImage.js";
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
} from "../utils/constants.js";

const profileForm = new PopupWithForm("#editProfile", (formData) => {
  // we'll add the function code in a moment
  renderUserProfileInfo.setUserInfo({
    name: formData.name,
    job: formData.aboutme,
  });
});
profileForm.setEventListeners();

const addCardForm = new PopupWithForm("#createCardPopup", (formData) => {
  renderCard([{ link: formData.imagelink, name: formData.title }], true);
});
addCardForm.setEventListeners();

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

function renderCard(cards, prepend) {
  const renderCardList = new Section(
    {
      data: cards,
      renderer: (item) => {
        const cardElement = createCard(item.link, item.name);
        prepend
          ? renderCardList.prependItem(cardElement)
          : renderCardList.addItem(cardElement);
      },
    },
    ".element"
  );
  renderCardList.renderer();
}

renderCard(initialCards, false);

function createCard(link, name) {
  const cardObj = new Card(
    { imgLink: link, title: name },
    "#template",
    ({ imgSrc, imgAlt }) => {
      const popupWithImage = new PopupWithImage("#picturePopup");
      popupWithImage.setEventListeners();
      popupWithImage.open({
        imgSrc: imgSrc,
        imgAlt: imgAlt,
      });
    }
  );
  const newCard = cardObj.generateCard();
  return newCard;
}

//Profile Handler
profileEditButton.addEventListener("click", () => {
  const userInfo = renderUserProfileInfo.getUserInfo();
  nameText.value = userInfo.userName;
  aboutmeText.value = userInfo.userJob;

  profileForm.open();
});

//card creation handler
cardCreationButton.addEventListener("click", () => {
  formValidators[createCardForm.getAttribute("name")].resetValidation();
  addCardForm.open();
});
