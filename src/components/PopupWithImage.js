import Popup from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImg = this._popup.querySelector(".popup__image");
    this._popupImgDescription = this._popup.querySelector(
      ".popup__image-description"
    );
  }
  _setImageProperties() {
    this._popupImg.setAttribute("src", this._imgSrc);
    this._popupImg.setAttribute("alt", `image of ${this._imgAlt}`);
    this._popupImgDescription.textContent = this._imgAlt;
  }
  open({ imgSrc, imgAlt }) {
    this._imgSrc = imgSrc;
    this._imgAlt = imgAlt;
    this._setImageProperties();
    super.open();
  }
}
