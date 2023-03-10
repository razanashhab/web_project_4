import Popup from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(selector, { imgSrc, imgAlt }) {
    super(selector);
    this._popupImg = this._popup.querySelector(".popup__image");
    this._popupImgDescription = this._popup.querySelector(
      ".popup__image-description"
    );
    this._imgSrc = imgSrc;
    this._imgAlt = imgAlt;
  }
  _setImageProperties() {
    this._popupImg.setAttribute("src", this._imgSrc);
    this._popupImg.setAttribute("alt", `image of ${this._imgAlt}`);
    this._popupImgDescription.textContent = this._imgAlt;
  }
  open() {
    this._setImageProperties();
    super.open();
  }
}
