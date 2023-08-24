

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import ShowMessage from 'src/components/ShowMessage';

const changePassword = (email, oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    const poolData = {
      UserPoolId: 'us-west-2_nTZIRvqNk',
      ClientId: '2c4r8a30g1h8vu08kvad3mm7ov',
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: oldPassword
    }), {
      onSuccess: (session) => {
        cognitoUser.changePassword(oldPassword, newPassword, function (err, result) {
          if (err) {
            console.error('Password change failed:', err);
            if (err.message.includes(':')) {
              const myArray = err.message.split(':');
              if (myArray[0] === "Password did not conform with policy") {
                ShowMessage(myArray[1])
              } else {
                console.log(err)
              }
              console.log()
              reject(err);
            }
          } else {
            console.log('Password changed successfully.');
            resolve(result);
          }
        });
      },
      onFailure: (error) => {
        console.error('Authentication failed:', error);
        reject(error);
      },
    });
  });
};

export { changePassword };
