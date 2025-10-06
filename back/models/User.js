class User {
    constructor(firstName, lastName, email, password, profilePicture64 = null, isAdmin = false) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.profilePicture64 = profilePicture64;
        this.isAdmin = isAdmin;
    }
}

module.exports = { User };