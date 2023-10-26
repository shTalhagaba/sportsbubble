import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import CognitoPool from '.';

const userSignup = async (fullName, lastName, email, password, zipcode, birthdate, pronouns) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'given_name', Value: fullName }),
      new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
      new CognitoUserAttribute({ Name: 'custom:zipcode', Value: zipcode }),
      new CognitoUserAttribute({ Name: 'birthdate', Value: birthdate }),
      new CognitoUserAttribute({ Name: 'custom:pronouns', Value: pronouns }),
    ];
    CognitoPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.error('Error signing up:', err);
        reject(err);
        return;
      }
      const cognitoUser = result;
      console.log('Successfully signed up. User:', JSON.stringify(result));
      resolve(cognitoUser);
    });
  });
};

const signupComplete = async (
  email,
  password,
  zipcode,
  birthdate,
  pronouns,
) => {
  return new Promise((resolve, reject) => {
    const userData = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: CognitoPool,
    });
    const details = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const attributeList = [
      new CognitoUserAttribute({ Name: 'custom:zipcode', Value: zipcode }), //zipcode
      new CognitoUserAttribute({ Name: 'birthdate', Value: birthdate }), //birthdate
      new CognitoUserAttribute({ Name: 'custom:pronouns', Value: pronouns }), // pronouns
    ];
    userData.authenticateUser(details, {
      onSuccess: data => {
        const cognitoUser = CognitoPool.getCurrentUser();
        if (cognitoUser) {
          cognitoUser.getSession((error, session) => {
            if (error) {
              reject(error);
              return;
            }

            if (session.isValid()) {
              cognitoUser.updateAttributes(
                attributeList,
                function (err, result) {
                  if (err) {
                    alert(err.message || JSON.stringify(err));
                    console.log('err : ' + err);
                    return;
                  }
                  resolve(result);
                  console.log('call result: ' + result);
                },
              );
            } else {
              reject(new Error('User session is not valid.'));
            }
          });
        } else {
          reject(new Error('User not authenticated.'));
        }
      },
      onFailure: err => {
        console.log(err);
      },
    });
  });
};

export { userSignup, signupComplete };
