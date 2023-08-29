let regEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
let regName = /^[a-zA-Z ]*$/; // character and space allowed
let regPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
import { ShowMessage } from 'src/components/ShowMessage';

export const checkValidation = checkableValue => {
  if (
    checkableValue === null ||
    checkableValue === undefined ||
    String(checkableValue).trim() === ''
  )
    return true;
  else return false;
};
export const signupValidation = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  emailOptCheck,
  termsCheck,
) => {
  if (checkValidation(firstName)) {
    ShowMessage('Please enter first name');
  } else if (firstName.length < 2) {
    ShowMessage('First name should be 3 characters');
  } else if (regName.test(firstName) === false) {
    ShowMessage('Name should accept only characters');
  } else if (checkValidation(lastName)) {
    ShowMessage('Please enter last name');
  } else if (firstName.length < 2) {
    ShowMessage('Last name should be 3 characters');
  } else if (regName.test(lastName) === false) {
    ShowMessage('Name should accept only characters');
  } else if (checkValidation(email)) {
    ShowMessage('Please enter email');
  } else {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (regEmail.test(trimmedEmail) === false) {
      ShowMessage('Please enter valid email');
    } else if (checkValidation(password)) {
      ShowMessage('Please enter password');
    } else if (password.length < 8) {
      ShowMessage('Password should be 8 characters');
    } else if (regPassword.test(trimmedPassword) === false) {
      ShowMessage('Password should have Upper case & symbol characters');
    } else if (password !== confirmPassword) {
      ShowMessage("Password don't match");
    } else if (!emailOptCheck) {
      ShowMessage('Please check email otp');
    } else if (!termsCheck) {
      ShowMessage('Please check terms and policy');
    } else {
      const trimmedEmail = email.trim();
      if (regEmail.test(trimmedEmail) === false) {
        ShowMessage('Please enter valid email');
      } else if (checkValidation(password)) {
        ShowMessage('Please enter password');
      } else if (password.length < 6) {
        ShowMessage('Password should be 6 characters');
      } else if (password !== confirmPassword) {
        ShowMessage("Password don't match");
      } else if (!emailOptCheck) {
        ShowMessage('Please check email otp');
      } else if (!termsCheck) {
        ShowMessage('Please check terms and policy');
      } else {
        return true;
      }
    }
  }
};
export const loginValidation = (email, password) => {
  if (checkValidation(email)) {
    ShowMessage('Please enter email');
  } else {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (regEmail.test(trimmedEmail) === false) {
      ShowMessage('Please enter valid email');
    } else if (checkValidation(password)) {
      ShowMessage('Please enter password');
    } else if (regPassword.test(trimmedPassword) === false) {
      ShowMessage('Password should have Upper case & symbol characters');
    } else {
      const trimmedEmail = email.trim();
      if (regEmail.test(trimmedEmail) === false) {
        ShowMessage('Please enter valid email');
      } else if (checkValidation(password)) {
        ShowMessage('Please enter password');
      } else {
        return true;
      }
    }
  }
};
export const updatePasswordValidation = (
  currentPassword,
  newPassword,
  newConfirmPassword,
) => {
  const trimmedCurrentPassword = currentPassword.trim();
  const trimmedNewPassword = newPassword.trim();
  if (checkValidation(currentPassword)) {
    ShowMessage('Please enter current Password');
  } else if (checkValidation(newPassword)) {
    ShowMessage('Please enter new Password');
  } else if (newPassword?.length < 6) {
    ShowMessage('Password should be 6 characters');
  } else if (checkValidation(newConfirmPassword)) {
    ShowMessage('Please enter new Password');
  } else if (regPassword.test(trimmedCurrentPassword) === false) {
    ShowMessage('Current Password should have Upper case & symbol characters');
  } else if (regPassword.test(trimmedNewPassword) === false) {
    ShowMessage('New Password should have Upper case & symbol characters');
  } else if (newPassword !== newConfirmPassword) {
    ShowMessage("Password don't match");
  } else {
    return true;
  }
};
export const otpValidation = otp => {
  if (checkValidation(otp)) {
    ShowMessage('Please enter otp');
  } else if (otp.length < 6) {
    ShowMessage('Please enter valid otp');
  } else {
    return true;
  }
};
export const resetPasswordValidation = (otp, password) => {
  const trimmedPassword = password.trim();
  if (checkValidation(otp)) {
    ShowMessage('Please enter otp');
  } else if (otp.length < 6) {
    ShowMessage('Please enter valid otp');
  } else if (checkValidation([password])) {
    ShowMessage('Please enter new Password');
  } else if (password?.length < 8) {
    ShowMessage('Password should be 8 characters');
  } else if (regPassword.test(trimmedPassword) === false) {
    ShowMessage('New Password should have Upper case & symbol characters');
  } else {
    return true;
  }
};
export const forgotPasswordValidation = email => {
  if (checkValidation(email)) {
    ShowMessage('Please enter email');
  } else if (regEmail.test(email) === false) {
    ShowMessage('Please enter valid email');
  } else {
    return true;
  }
};
export const updateProfileValidation = (
  firstName,
  lastName,
  zipCode,
  pronouns,
) => {
  if (checkValidation(firstName)) {
    ShowMessage('Please enter first name');
  } else if (firstName.length < 2) {
    ShowMessage('First name should be 3 characters');
  } else if (regName.test(firstName) === false) {
    ShowMessage('Name should accept only characters');
  } else if (checkValidation(lastName)) {
    ShowMessage('Please enter last name');
  } else if (firstName.length < 2) {
    ShowMessage('Last name should be 3 characters');
  } else if (regName.test(lastName) === false) {
    ShowMessage('Name should accept only characters');
  } else if (checkValidation(zipCode)) {
    ShowMessage('Please enter zipCode.');
  } else if (checkValidation(pronouns)) {
    ShowMessage('Please select Pronouns.');
  } else {
    if (zipCode.length < 4) {
      ShowMessage('Zip code is too short.');
    } else {
      return true;
    }
  }
};
export const completeProfileValidation = (zipCode, dob, pronouns) => {
  if (checkValidation(zipCode)) {
    ShowMessage('Please enter zipcode');
  } else if (checkValidation(dob)) {
    ShowMessage('Please select date of birth');
  } else if (checkValidation(zipCode)) {
    ShowMessage('Please enter zipCode.');
  } else if (checkValidation(pronouns)) {
    ShowMessage('Please select Pronouns.');
  } else {
    if (zipCode.length < 4) {
      ShowMessage('Zip code is too short.');
    } else {
      return true;
    }
  }
};
