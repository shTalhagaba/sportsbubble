import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const userUpdateProfile = (idToken, accessToken, fullName, lastName, zipCode, dob) => {
  return new Promise((resolve, reject) => {
    const poolData = {
      UserPoolId: 'us-west-2_nTZIRvqNk',
      ClientId: '2c4r8a30g1h8vu08kvad3mm7ov',
    };

    const userPool = new CognitoUserPool(poolData);

    const attributeList = [
      new CognitoUserAttribute({ Name: 'given_name', Value: fullName }),
      new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
      new CognitoUserAttribute({ Name: 'zipcode', Value: zipCode }),
      new CognitoUserAttribute({ Name: 'birthdate', Value: dob }),
    ];

    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((error, session) => {
        if (error) {
          reject(error);
          return;
        }

        if (session.isValid()) {
          cognitoUser.updateAttributes(attributeList, (err, result) => {
            if (err) {
              console.error('Error updating attributes:', err);
              reject(err);
              return;
            } else {
              console.log('Attributes updated successfully:', result);
              resolve(result);
            }
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

export { userUpdateProfile };
