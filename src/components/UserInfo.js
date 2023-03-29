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
    setUserInfo({ userId, name, job, avatar }) {
        this._userId = userId;
        this._userName.textContent = name;
        this._userJob.textContent = job;
        if (avatar != null) this._userAvatar.setAttribute("src", avatar);
    }
    getUserId() {
        return this._userId;
    }
    updateUserAvatar(avatar) {
        this._userAvatar.setAttribute("src", avatar);
    }
}