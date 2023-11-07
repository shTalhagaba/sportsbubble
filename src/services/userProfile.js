const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import ShowMessage from 'src/components/ShowMessage';
import CognitoPool from '.';

const changePassword = (email, oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: CognitoPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: oldPassword,
      }),
      {
        onSuccess: session => {
          cognitoUser.changePassword(
            oldPassword,
            newPassword,
            function (err, result) {
              if (err) {
                console.error('Password change failed:', err);
                if (err.message.includes(':')) {
                  const myArray = err.message.split(':');
                  if (myArray[0] === 'Password did not conform with policy') {
                    ShowMessage(myArray[1]);
                  } else {
                    console.log(err);
                  }
                  console.log();
                  reject(err);
                }
              } else {
                console.log('Password changed successfully.');
                resolve(result);
              }
            },
          );
        },
        onFailure: error => {
          console.error('Authentication failed:', error);
          reject(error);
        },
      },
    );
  });
};

export {changePassword};
