export class Card {
    constructor(
        data,
        selector,
        handleCardClick,
        handleCardDeletion,
        handleLikeClick,
        activeUser
    ) {
        this._id = data.id;
        this._title = data.title;
        this._imgLink = data.imgLink;
        this._owner = data.owner;
        this._likes = data.likes;
        this._cardSelector = selector;
        this._handleCardClick = handleCardClick;
        this._handleCardDeletion = handleCardDeletion;
        this._handleLikeClick = handleLikeClick;
        this._activeUser = activeUser;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);

        return cardElement;
    }

    _getLikeActiveStatus() {
        const userId = this._activeUser;
        const isIncluded = this._likes.some(function(like) {
            return like._id.includes(userId);
        });
        return isIncluded;
    }

    _setCardInfo() {
        this._cardImage.setAttribute("src", `${this._imgLink}`);
        this._cardImage.setAttribute("alt", `image of ${this._title}`);
        this._cardParagraph.textContent = this._title;
        this._cardLikesLabel.textContent = this._likes.length;
        if (this._getLikeActiveStatus()) {
            this._activateLikeButton();
        }
    }
    _updateLikesCounter(likes) {
        this._likes = likes;
        this._cardLikesLabel.textContent = this._likes.length;
    }

    _activateLikeButton() {
        this._cardLikeButton.classList.add("card__button_active");
    }
    _inactivateLikeButton() {
        this._cardLikeButton.classList.remove("card__button_active");
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener("click", (evt) => {
            this._handleLikeClick(this._likes);
        });
        this._cardDeleteButton.addEventListener("click", (evt) => {
            this._handleCardDeletion(evt.target.closest(".card"), this._id);
        });
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
        this._cardLikesLabel = this._element.querySelector(".card__label");
        //control the visiability of the delete button
        this._showDeleteButton();
        //set values for the card title and image link
        this._setCardInfo();
        //set event listener
        this._setEventListeners();

        return this._element;
    }
    _showDeleteButton() {
        if (this._owner._id === this._activeUser) {
            this._cardDeleteButton.classList.remove("card__delete-button-hidden");
        } else {
            this._cardDeleteButton.classList.add("card__delete-button-hidden");
        }
    }
}