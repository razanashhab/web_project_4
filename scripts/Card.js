import { openPopup, closePopup } from "./utils.js";
export class Card {
  constructor(data, selector) {
    this._title = data.title;
    this._imgLink = data.imgLink;
    this._cardSelector = selector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    return cardElement;
  }

  _setCardInfo() {
    this._element
      .querySelector(".card__image")
      .setAttribute("src", `${this._imgLink}`);
    this._element
      .querySelector(".card__image")
      .setAttribute("alt", `image of ${this._title}`);
    this._element.querySelector(".card__paragraph").textContent = this._title;
  }
  _openPicturePopup(evt) {
    const picturePopup = document.querySelector("#picturePopup");
    const popupImage = picturePopup.querySelector(".popup__image");
    popupImage.setAttribute("src", evt.target.getAttribute("src"));
    popupImage.setAttribute(
      "alt",
      `image of ${evt.target.getAttribute("alt")}`
    );
    const popupImageDescription = picturePopup.querySelector(
      ".popup__image-description"
    );
    popupImageDescription.textContent = evt.target.getAttribute("alt");
    openPopup(picturePopup);
  }

  _toggleLikeButton(evt) {
    evt.target.classList.toggle("card__button_active");
  }

  _deleteCard(evt) {
    evt.target.parentNode.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__button")
      .addEventListener("click", this._toggleLikeButton);
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._deleteCard);
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._openPicturePopup);
  }
  generateCard() {
    this._element = this._getTemplate();
    //set values for the card title and image link
    this._setCardInfo();
    //set event listener
    this._setEventListeners();

    return this._element;
  }
}
