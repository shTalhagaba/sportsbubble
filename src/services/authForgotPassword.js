import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

const initiateForgotPassword = async (username) => {
  const poolData = {
    UserPoolId: 'us-west-2_nTZIRvqNk',
    ClientId: '2c4r8a30g1h8vu08kvad3mm7ov'
  };

  const userPool = new CognitoUserPool(poolData);

  const userData = {
    Username: username,
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);

  try {
    await new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: () => {
          resolve();
        },
        onFailure: (err) => {
          reject(`Failed to initiate password reset: ${err.message || err}`);
        }
      });
    });
    return true; // Indicate that the initiation was successful
  } catch (error) {
    throw error;
  }
};

const confirmPasswordReset = async (username, newPassword, verificationCode) => {
  const poolData = {
    UserPoolId: 'us-west-2_nTZIRvqNk',
    ClientId: '2c4r8a30g1h8vu08kvad3mm7ov'
  };

  const userPool = new CognitoUserPool(poolData);

  const userData = {
    Username: username,
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);

  try {
    await new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {
          resolve();
        },
        onFailure: (err) => {
          reject(`Failed to reset password: ${err.message || err}`);
        }
      });
    });
    return true; // Indicate that the password reset was successful
  } catch (error) {
    throw error;
  }
};

export { initiateForgotPassword, confirmPasswordReset };
