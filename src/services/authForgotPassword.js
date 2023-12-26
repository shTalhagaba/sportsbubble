import {CognitoUser} from 'amazon-cognito-identity-js';
import CognitoPool from '.';

const initiateForgotPassword = async username => {
  const userData = {
    Username: username,
    Pool: CognitoPool,
  };
  const cognitoUser = new CognitoUser(userData);
  try {
    await new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: () => {
          resolve();
        },
        onFailure: err => {
          reject(`Failed to initiate password reset: ${err.message || err}`);
        },
      });
    });
    return true; // Indicate that the initiation was successful
  } catch (error) {
    throw error;
  }
};

const confirmPasswordReset = async (
  username,
  newPassword,
  verificationCode,
) => {
  const userData = {
    Username: username,
    Pool: CognitoPool,
  };
  const cognitoUser = new CognitoUser(userData);
  try {
    await new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {
          resolve();
        },
        onFailure: err => {
          reject(`Failed to reset password: ${err.message || err}`);
        },
      });
    });
    return true; // Indicate that the password reset was successful
  } catch (error) {
    throw error;
  }
};

export {initiateForgotPassword, confirmPasswordReset};
