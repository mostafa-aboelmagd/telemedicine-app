function passwordValidation(str) {
    const hasNumbers = /\d/.test(str);
    const hasAlphabets = /[a-zA-Z]/.test(str);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(str);

    return hasNumbers && hasAlphabets && hasSpecialChars && str.length >= 8;
}

module.exports = {passwordValidation };