export function openPopup(popup) {
    popup.classList.add("popup_opened");
    popup.addEventListener("mousedown", closePopupOnRemoteClick);
    document.addEventListener("keydown", closeModalByEscape);
}

export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    popup.removeEventListener("mousedown", closePopupOnRemoteClick);
    document.removeEventListener("keydown", closeModalByEscape);

}

function closePopupOnRemoteClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}

function closeModalByEscape(evt) {
    if (evt.key == "Escape") {
        const openedModal = document.querySelector(".popup_opened");
        closePopup(openedModal);
    }
}