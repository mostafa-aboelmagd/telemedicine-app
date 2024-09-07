class User {
    constructor(fName, lName, email, password, gender, phone, role, birthYear) {
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.gender = gender;
        this.phone = phone;
        this.birthYear = birthYear;
    }
}

exports.User = User;