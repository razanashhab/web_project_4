import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const nameText = editProfile.querySelector("#name");
const aboutmeText = editProfile.querySelector("#aboutme");
const editProfileForm = editProfile.querySelector("#editProfileForm");
const cardCreationButton = profile.querySelector(".profile__add-button");
const createCardPopup = document.querySelector("#createCardPopup");
const title = createCardPopup.querySelector("#title");
const imagelink = createCardPopup.querySelector("#imagelink");
const createCardForm = createCardPopup.querySelector("#createCardForm");
const closeButtons = document.querySelectorAll(".popup__close-button");
const element = document.querySelector(".element");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
const formValidators = {};

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

function createCard(link, name) {
  const cardObj = new Card({ imgLink: link, title: name }, "#template");
  const newCard = cardObj.generateCard();
  return newCard;
}

initialCards.forEach((card) => {
  element.appendChild(createCard(card.link, card.name));
});

function fillProfileForm() {
  nameText.value = profileName.textContent;
  aboutmeText.value = profileDescription.textContent;
}

function showEditProfile() {
  fillProfileForm();
  openPopup(editProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameText.value;
  profileDescription.textContent = aboutmeText.value;
  closePopup(editProfile);
}

function openCreateCardForm() {
  openPopup(createCardPopup);
}

function handleCreateCardFormSubmit(evt) {
  evt.preventDefault();
  element.prepend(createCard(imagelink.value, title.value));

  closePopup(createCardPopup);
  createCardForm.reset();
  formValidators[createCardForm.getAttribute("name")].resetValidation();
}

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".popup");
  // set the listener
  button.addEventListener("click", () => closePopup(popup));
});

profileEditButton.addEventListener("click", showEditProfile);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
cardCreationButton.addEventListener("click", openCreateCardForm);
createCardForm.addEventListener("submit", handleCreateCardFormSubmit);
