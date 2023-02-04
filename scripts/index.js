const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const editProfilePopup = document.querySelector("#editProfile");
const closeEditProfileBtn = editProfile.querySelector("#closeEditProfile");
const nameText = editProfile.querySelector("#name");
const aboutmeText = editProfile.querySelector("#aboutme");
const editProfileForm = editProfile.querySelector("#editProfileForm");

const cardCreationButton = profile.querySelector(".profile__add-button");
const createCardPopup = document.querySelector("#createCardPopup");
const closeCreateCardBtn = createCardPopup.querySelector("#closeCreateCard");
const title = createCardPopup.querySelector("#title");
const imagelink = createCardPopup.querySelector("#imagelink");
const createCardForm = createCardPopup.querySelector("#createCardForm");

const likeButton = document.querySelector(".card__button");
const picturePopup = document.querySelector("#picturePopup");
const popupImage = picturePopup.querySelector(".popup__image");
const closePicturePopup = picturePopup.querySelector("#closePicturePopup");
const closeButtons = document.querySelectorAll(".popup__close-button");

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
const element = document.querySelector(".element");
const template = document.querySelector("#template");
const popupList = Array.from(document.querySelectorAll(".popup"));

function addCard(cardLink, cardName) {
  const clone = template.content.cloneNode(true);
  const cardImage = clone.querySelector(".card__image");
  const cardParagraph = clone.querySelector(".card__paragraph");
  const cardButton = clone.querySelector(".card__button");
  const cardDeleteButton = clone.querySelector(".card__delete-button");
  const cardElemment = clone.querySelector(".element__card");
  cardImage.setAttribute("src", `${cardLink}`);
  cardImage.setAttribute("alt", `image of ${cardName}`);
  cardButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__button_active");
  });
  cardDeleteButton.addEventListener("click", function (evt) {
    cardElemment.remove();
  });
  cardImage.addEventListener("click", function (evt) {
    openPicturePopup();
    popupImage.setAttribute("src", evt.target.getAttribute("src"));
    popupImage.setAttribute("alt", `image of ${cardName}`);
    const popupImageDescription = picturePopup.querySelector(
      ".popup__image-description"
    );
    popupImageDescription.textContent = cardName;
  });
  cardParagraph.textContent = cardName;
  return clone;
}

initialCards.forEach((card) => {
  const clone = addCard(card.link, card.name);
  element.appendChild(clone);
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
  const addedTitle = title.value;
  const addedImage = imagelink.value;
  const clone = addCard(addedImage, addedTitle);
  evt.target.reset();
  element.prepend(clone);

  closePopup(createCardPopup);
  toggleButtonState(
    Array.from(createCardPopup.querySelectorAll(".form__input")),
    createCardPopup.querySelector(".form__submit"),
    "button_inactive"
  );
}

function openPicturePopup() {
  openPopup(picturePopup);
}

function closePopupOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closeModalByEscape(evt) {
  if (evt.key == "Escape") {
    const openedModal = document.querySelector(".popup_open");
    closePopup(openedModal);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", closePopupOnRemoteClick);
  document.addEventListener("mousedown", closeModalByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", closePopupOnRemoteClick);
  document.removeEventListener("mousedown", closeModalByEscape);
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
