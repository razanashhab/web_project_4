const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-button");
const nameText = popup.querySelector("#name");
const aboutmeText = popup.querySelector("#aboutme");
const saveButton = popup.querySelector(".form__button");

function showPopup() {
    nameText.value = profileName.innerHTML;
    aboutmeText.value = profileDescription.innerHTML;
    popup.classList.add("popup_opened");
}

function closePopup() {
    popup.classList.remove("popup_opened");
    nameText.value = "";
    aboutmeText.value = "";
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.innerHTML = nameText.value;
    profileDescription.innerHTML = aboutmeText.value;
    closePopup();
}

profileEditButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", closePopup);
saveButton.addEventListener("click", handleProfileFormSubmit);