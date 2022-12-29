let profile = document.querySelector(".profile");
let profileEditButton = profile.querySelector(".profile__edit");
let profileName = profile.querySelector(".profile__name");
let profileDescription = profile.querySelector(".profile__description");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-button");
let nameText = popup.querySelector("#name");
let aboutmeText = popup.querySelector("#aboutme");
let saveButton = popup.querySelector(".form__button");

function showPopup() {
    nameText.value = profileName.innerHTML;
    aboutmeText.value = profileDescription.innerHTML;
    popup.classList.remove("popup__hidden");
}

function closePopup() {
    popup.classList.add("popup__hidden");
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