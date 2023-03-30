export class UserInfo {
    constructor({ userName, userJob, userAvatar }) {
        this._userName = userName;
        this._userJob = userJob;
        this._userAvatar = userAvatar;
    }
    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userJob: this._userJob.textContent,
        };
    }
    setUserInfo({ name, about, avatar, _id }) {
        this._userId = _id;
        this._userName.textContent = name;
        this._userJob.textContent = about;
        this._userAvatar.setAttribute("src", avatar);
    }
    getUserId() {
        return this._userId;
    }
}