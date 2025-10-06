class Contact {
    constructor(firstName, lastName, email, userId, phoneNumber = null, company = null, notes = null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userId = userId;
        this.phoneNumber = phoneNumber;
        this.company = company;
        this.notes = notes;
    }
}

module.exports = { Contact };

