class User {
    constructor(firstName, lastName, email, password, profilePicture64 = null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.profilePicture64 = profilePicture64;
    }
}

module.exports = { User };