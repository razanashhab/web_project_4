const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const editProfile = document.querySelector("#editProfile");
const closeEditProfileBtn = editProfile.querySelector("#closeEditProfile");
const nameText = editProfile.querySelector("#name");
const aboutmeText = editProfile.querySelector("#aboutme");
const saveButton = editProfile.querySelector(".form__button");
const editProfileForm = editProfile.querySelector("#editProfileForm");

const cardCreationButton = profile.querySelector(".profile__add-button");
const createCard = document.querySelector("#createCard");
const closeCreateCardBtn = createCard.querySelector("#closeCreateCard");
const title = createCard.querySelector("#title");
const imagelink = createCard.querySelector("#imagelink");
const createCardForm = createCard.querySelector("#createCardForm");

const likeButton = document.querySelector(".card__button");
const picturePopup = document.querySelector("#picturePopup");
const closePicturePopup = picturePopup.querySelector("#closePicturePopup");

const initialCards = [{
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

function addCard(cardLink, cardName) {
    const clone = template.content.cloneNode(true);
    const cardImage = clone.querySelector(".card__image");
    const cardParagraph = clone.querySelector(".card__paragraph");
    cardImage.setAttribute("src", `${cardLink}`);
    cardImage.setAttribute("alt", `image of ${cardName}`);
    clone
        .querySelector(".card__button")
        .addEventListener("click", function(evt) {
            evt.target.classList.toggle("card__button_active");
        });
    clone
        .querySelector(".card__delete-button")
        .addEventListener("click", function(evt) {
            evt.target.parentElement.remove();
        });
    clone.querySelector(".card__image").addEventListener("click", function(evt) {
        picturePopup.classList.toggle("popup_opened");
        const popupImage = picturePopup.querySelector(".popup__image");
        popupImage.setAttribute("src", `${evt.target.getAttribute("src")}`);
        popupImage.setAttribute(
            "alt",
            `image of ${evt.target.getAttribute("alt")}`
        );
        const popupImageDescription = picturePopup.querySelector(
            ".popup__image-description"
        );
        popupImageDescription.textContent =
            evt.target.nextElementSibling.firstElementChild.innerText;
    });
    cardParagraph.textContent = cardName;
    return clone;
}

initialCards.forEach((card) => {
    const clone = addCard(card.link, card.name);
    element.appendChild(clone);
});

function showEditProfile() {
    nameText.value = profileName.textContent;
    aboutmeText.value = profileDescription.textContent;
    editProfile.classList.add("popup_opened");
}

function closeEditProfile() {
    editProfile.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameText.value;
    profileDescription.textContent = aboutmeText.value;
    closeEditProfile();
}

function createCardFormToggle() {
    createCard.classList.toggle("popup_opened");
}

function handleCreateCardFormSubmit(evt) {
    evt.preventDefault();
    const addedTitle = title.value;
    const addedImage = imagelink.value;
    const clone = addCard(addedImage, addedTitle);
    element.prepend(clone);
    createCardFormToggle();
}

function createPictureToggle() {
    picturePopup.classList.toggle("popup_opened");
}

profileEditButton.addEventListener("click", showEditProfile);
closeEditProfileBtn.addEventListener("click", closeEditProfile);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

cardCreationButton.addEventListener("click", createCardFormToggle);
closeCreateCardBtn.addEventListener("click", createCardFormToggle);
createCardForm.addEventListener("submit", handleCreateCardFormSubmit);
closePicturePopup.addEventListener("click", createPictureToggle);