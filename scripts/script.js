const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-button");
const nameText = popup.querySelector("#name");
const aboutmeText = popup.querySelector("#aboutme");
const saveButton = popup.querySelector(".form__button");
const form = popup.querySelector("form");

DisplayCard();

function DisplayCard() {
    const element = document.querySelector(".element");
    const template = document.querySelector("#template");
    const images = [
        "yosemite-valley.jpg",
        "lake-louise.png",
        "bald-mountains.jpg",
        "latemar.jpg",
        "vanoise-national-park.jpg",
        "lago-di-braies.jpg",
    ];
    const imagenames = [
        "Yosemite Valley",
        "Lake Louise",
        "Bald Mountains",
        "Latemar",
        "Vanoise National Park",
        "Lago di Braies",
    ];
    for (let i = 0; i < images.length; i++) {
        let clone = template.content.cloneNode(true);
        let cardImage = clone.querySelector(".card__image");
        let cardParagraph = clone.querySelector(".card__paragraph");
        cardImage.setAttribute("src", `./images/${images[i]}`);
        cardImage.setAttribute("alt", `image of ${imagenames[i]}`);
        cardParagraph.textContent = imagenames[i];
        element.appendChild(clone);
    }
}

function showPopup() {
    nameText.value = profileName.textContent;
    aboutmeText.value = profileDescription.textContent;
    popup.classList.add("popup_opened");
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameText.value;
    profileDescription.textContent = aboutmeText.value;
    closePopup();
}

profileEditButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", closePopup);
form.addEventListener("submit", handleProfileFormSubmit);