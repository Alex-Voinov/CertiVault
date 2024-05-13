module.exports = class UserDto {
    email;
    id;
    login;
    name;
    surName;
    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.name = model.name;
        this.surName = model.surName;
    }
}