export class Card {
    constructor(data, selector, handleCardClick) {
        this._title = data.title;
        this._imgLink = data.imgLink;
        this._cardSelector = selector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);

        return cardElement;
    }

    _setCardInfo() {
        this._cardImage.setAttribute("src", `${this._imgLink}`);
        this._cardImage.setAttribute("alt", `image of ${this._title}`);
        this._cardParagraph.textContent = this._title;
    }

    _toggleLikeButton(evt) {
        evt.target.classList.toggle("card__button_active");
    }

    _deleteCard(evt) {
        evt.target.closest(".card").remove();
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener("click", this._toggleLikeButton);
        this._cardDeleteButton.addEventListener("click", this._deleteCard);
        this._cardImage.addEventListener("click", (evt) => {
            this._handleCardClick({
                imgSrc: evt.target.getAttribute("src"),
                imgAlt: evt.target.getAttribute("alt"),
            });
        });
    }
    generateCard() {
        this._element = this._getTemplate();
        this._cardLikeButton = this._element.querySelector(".card__button");
        this._cardDeleteButton = this._element.querySelector(
            ".card__delete-button"
        );
        this._cardImage = this._element.querySelector(".card__image");
        this._cardParagraph = this._element.querySelector(".card__paragraph");
        //set values for the card title and image link
        this._setCardInfo();
        //set event listener
        this._setEventListeners();

        return this._element;
    }
}