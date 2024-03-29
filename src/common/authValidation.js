import { ShowMessage } from 'src/components/ShowMessage';

const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regName = /^[a-zA-Z ]*$/; // Characters and spaces allowed
const regPassword = /^.{8,}$/;

export const checkValidation = checkableValue => {
  if (
    checkableValue === null ||
    checkableValue === undefined ||
    String(checkableValue).trim() === ''
  ) {
    return true;
  } else {
    return false;
  }
};

export const signupValidation = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  termsCheck,
) => {
  if (checkValidation(firstName)) {
    ShowMessage('Please Enter First Name.');
  } else if (regName.test(firstName) === false) {
    ShowMessage('Name should only contain letters and spaces.');
  } else if (checkValidation(lastName)) {
    ShowMessage('Please Enter Last Name.');
  } else if (regName.test(lastName) === false) {
    ShowMessage('Name should only contain letters and spaces.');
  } else if (checkValidation(email)) {
    ShowMessage('Please Enter Email Address.');
  } else {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (regEmail.test(trimmedEmail) === false) {
      ShowMessage('Please Enter a Valid Email Address.');
    } else if (checkValidation(password)) {
      ShowMessage('Please Enter Password.');
    } else if (password.length < 8) {
      ShowMessage('Password should be at least 8 characters long.');
    } else if (regPassword.test(trimmedPassword) === false) {
      ShowMessage(
        'Password should include uppercase letters and numbers.',
      );
    } else if (password !== confirmPassword) {
      ShowMessage("Passwords don't match.");
    } else if (!termsCheck) {
      ShowMessage('Please accept the Terms and Policy.');
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
    ShowMessage('Please Enter Email Address.');
  } else {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (regEmail.test(trimmedEmail) === false) {
      ShowMessage('Please Enter a Valid Email Address.');
    } else if (checkValidation(password)) {
      ShowMessage('Please Enter Password.');
    } else {
      return true;
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
    ShowMessage('Please Enter Current Password.');
  } else if (checkValidation(newPassword)) {
    ShowMessage('Please Enter New Password.');
  } else if (newPassword?.length < 6) {
    ShowMessage('Password should be at least 6 characters long.');
  } else if (checkValidation(newConfirmPassword)) {
    ShowMessage('Please Enter New Password.');
  } else if (regPassword.test(trimmedNewPassword) === false) {
    ShowMessage(
      'New Password should include uppercase letters and numbers.',
    );
  } else if (newPassword !== newConfirmPassword) {
    ShowMessage("Passwords don't match.");
  } else {
    return true;
  }
};

export const otpValidation = otp => {
  if (checkValidation(otp)) {
    ShowMessage('Please Enter OTP.');
  } else if (otp.length < 6) {
    ShowMessage('Please Enter Valid OTP.');
  } else {
    return true;
  }
};

export const resetPasswordValidation = (otp, password) => {
  const trimmedPassword = password.trim();
  if (checkValidation(otp)) {
    ShowMessage('Please Enter OTP.');
  } else if (otp.length < 6) {
    ShowMessage('Please Enter Valid OTP.');
  } else if (checkValidation([password])) {
    ShowMessage('Please Enter New Password.');
  } else if (password?.length < 8) {
    ShowMessage('Password should be at least 8 characters long.');
  } else if (regPassword.test(trimmedPassword) === false) {
    ShowMessage(
      'New Password should include uppercase letters and numbers.',
    );
  } else {
    return true;
  }
};

export const forgotPasswordValidation = email => {
  if (checkValidation(email)) {
    ShowMessage('Please Enter Email Address.');
  } else if (regEmail.test(email) === false) {
    ShowMessage('Please Enter a Valid Email Address.');
  } else {
    return true;
  }
};

export const updateProfileValidation = (
  firstName,
  lastName,
  zipCode,
) => {
  if (checkValidation(firstName)) {
    ShowMessage('Please Enter First Name.');
  }  else if (regName.test(firstName) === false) {
    ShowMessage('Name should only contain letters and spaces.');
  } else if (checkValidation(lastName)) {
    ShowMessage('Please Enter Last Name.');
  } else if (regName.test(lastName) === false) {
    ShowMessage('Name should only contain letters and spaces.');
  } else if (checkValidation(zipCode)) {
    ShowMessage('Please Enter Zip Code.');
  } else if (zipCode.length < 4) {
    ShowMessage('Zip Code is too short.');
  } else {
    return true;
  }
};
export const completeProfileValidation = (zipCode, dob) => {
  if (checkValidation(zipCode)) {
    ShowMessage('Please Enter Zip Code.');
  } else if (checkValidation(dob)) {
    ShowMessage('Please Select Date of Birth.');
  } else {
    const dateBirth = new Date(dob);
    if (isNaN(dateBirth)) {
      ShowMessage('Invalid Date of Birth.');
    } else {
      const currentDate = new Date();
      const ageInYears = Math.floor((currentDate - dateBirth) / (365 * 24 * 60 * 60 * 1000));

      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      const birthYear = dateBirth.getFullYear();
      const birthMonth = dateBirth.getMonth();
      const birthDay = dateBirth.getDate();

      if (currentYear - birthYear < 14 || (currentYear - birthYear === 14 && (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)))) {
        ShowMessage('You must be at least 14 years of age.');
      } else if (zipCode.length < 4) {
        ShowMessage('Zip Code is too short.');
      } else {
        return true;
      }
    }
  }
};

