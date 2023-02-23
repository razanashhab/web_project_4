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
const formSelectors = document.querySelectorAll(".form");
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

formSelectors.forEach((form) => {
  const formValidator = new FormValidator(
    {
      inputSelector: ".form__input",
      submitButtonSelector: ".form__submit",
      inactiveButtonClass: "button_inactive",
      inputErrorClass: "form__input_type_error",
      errorClass: "form__input-error_active",
    },
    form
  );
  formValidator.enableValidation();
});

initialCards.forEach((card) => {
  //const clone = addCard(card.link, card.name);
  const cardObj = new Card(
    { imgLink: card.link, title: card.name },
    "#template"
  );
  const cardObject = cardObj.generateCard();
  element.appendChild(cardObject);
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

function createCard() {
  openPopup(createCardPopup);
}

function handleCreateCardFormSubmit(evt) {
  evt.preventDefault();
  const cardObj = new Card(
    { imgLink: imagelink.value, title: title.value },
    "#template"
  );
  const xx = cardObj.generateCard();
  element.prepend(xx);

  closePopup(createCardPopup);
  toggleButtonState(
    Array.from(createCardPopup.querySelectorAll(".form__input")),
    createCardPopup.querySelector(".form__submit"),
    "button_inactive"
  );
}

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".popup");
  // set the listener
  button.addEventListener("click", () => closePopup(popup));
});

profileEditButton.addEventListener("click", showEditProfile);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
cardCreationButton.addEventListener("click", createCard);
createCardForm.addEventListener("submit", handleCreateCardFormSubmit);
