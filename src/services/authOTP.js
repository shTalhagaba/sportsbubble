const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const userOTP = (email, otp, mfaSession) => {
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

    cognitoUser.confirmRegistration(otp, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        reject(err);
        return;
      }
      console.log('call result: ' + result);
      resolve(result);
      return result;
    });
  });
};
const resendCode = (email) => {
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
  
      cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            reject(err);
            return;
          }
          console.log('call result: ' , JSON.stringify(result));
          resolve();
          return result;
        });
    });
  };

export {userOTP,resendCode};
