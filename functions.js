const passwordValidation = (str) => {
    const hasNumbers = /\d/.test(str);
    const hasAlphabets = /[a-zA-Z]/.test(str);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(str);

    return hasNumbers && hasAlphabets && hasSpecialChars && str.length >= 8;
}

const splitAndToLower = (str) => {
    const [str_1, str_2] = str.split(' ');
    if (str_1 && str_2) {
        return [str_1.toLowerCase(), str_2.toLowerCase()];
    }
    return [str_1 ? str_1.toLowerCase() : '', str_2 ? str_2.toLowerCase() : ''];
}

module.exports = {passwordValidation, splitAndToLower};


module.exports = {passwordValidation, splitAndToLower};