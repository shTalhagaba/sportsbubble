import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import CognitoPool from '.';

const userUpdateProfile = (fullName, lastName, zipCode, dob, pronouns) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'name', Value: fullName }),
      new CognitoUserAttribute({ Name: 'given_name', Value: lastName }),
      new CognitoUserAttribute({ Name: 'custom:zipcode', Value: zipCode }), //zipcode
      new CognitoUserAttribute({ Name: 'birthdate', Value: dob }), //birthdate
      new CognitoUserAttribute({ Name: 'custom:pronouns', Value: pronouns }), // pronouns
    ];
    const cognitoUser = CognitoPool.getCurrentUser();
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

const deleteUser = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = CognitoPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((error, session) => {
        if (error) {
          reject(error);
          return;
        }
        if (session.isValid()) {
          cognitoUser.deleteUser((err, result) => {
            if (err) {
              console.error('Error deleting user:', err);
              alert(err.message || JSON.stringify(err));
              return;
            }
            console.log('User deleted successfully:', result);
            resolve(result)
            // Perform any necessary actions after user deletion
          });
        } else {
          reject(new Error('User session is not valid.'));
          console.error('User session is not valid.');
        }
      });
    } else {
      reject(new Error('User not authenticated.'));
      console.error('User not authenticated.');
    }
  });
};

export { userUpdateProfile, deleteUser };
