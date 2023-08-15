let regEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
let regName = /^[a-zA-Z ]*$/; // character and space allowed
import { ShowMessage } from "src/components/ShowMessage";

export const checkValidation = (checkableValue) => {
    if (checkableValue === null || checkableValue === undefined || String(checkableValue).trim() === '')
        return true
    else
        return false
}
export const signupValidation = (firstName, lastName, email, password, confirmPassword) => {
    if (checkValidation(firstName)) {
        ShowMessage("Please enter first name");
    } else if (firstName.length < 2) {
        ShowMessage("First name should be 3 characters");
    } else if (regName.test(firstName) === false) {
        ShowMessage("Name should accept only characters");
    } else if (checkValidation(lastName)) {
        ShowMessage("Please enter last name");
    } else if (firstName.length < 2) {
        ShowMessage("Last name should be 3 characters");
    } else if (regName.test(lastName) === false) {
        ShowMessage("Name should accept only characters");
    } else if (checkValidation(email)) {
        ShowMessage("Please enter email");
    } else {
        const trimmedEmail = email.trim();
        if (regEmail.test(trimmedEmail) === false) {
            ShowMessage("Please enter valid email");
        } else if (checkValidation(password)) {
            ShowMessage("Please enter password");
        } else if (password.length < 6) {
            ShowMessage("Password should be 6 characters");
        } else if (password !== confirmPassword) {
            ShowMessage("Password don't match")
        } else {
            return true;
        }
    }
}
