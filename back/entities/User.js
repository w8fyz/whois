class User {

    constructor(id = null, firstName, lastName, email, password, profilePicture64 = null) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.profilePicture64 = profilePicture64;
    }
}