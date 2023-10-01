const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import CognitoPool from '.';

const userOTP = (email, otp, mfaSession) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: CognitoPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(otp, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        reject(err);
        return;
      }
      console.log('userOTP result: ' + result);
      resolve(result);
      return result;
    });
  });
};

const resendCode = email => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: CognitoPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        reject(err);
        return;
      }
      console.log('call result: ', JSON.stringify(result));
      resolve();
      return result;
    });
  });
};

const signOut = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = CognitoPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((error, session) => {
        if (error) {
          reject(error);
          return;
        }
        if (session.isValid()) {
          cognitoUser.signOut((signOutErr, result) => {
            if (signOutErr) {
              console.error('Error signing out:', signOutErr);
              reject(signOutErr);
              return;
            }
            console.log('Sign-out successful:', result);
            resolve(result);
          });
        } else {
          reject(new Error('User session is not valid.'));
        }
      });
    } else {
      reject(new Error('User not authenticated.'));
    }
  });
};

export { userOTP, resendCode, signOut };
