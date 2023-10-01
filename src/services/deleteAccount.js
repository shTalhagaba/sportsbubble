const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const adminDeleteUser = (adminCredentials, usernameToDelete) => {
  return new Promise((resolve, reject) => {
    const poolData = {
      UserPoolId: 'us-west-2_nTZIRvqNk',
      ClientId: '2c4r8a30g1h8vu08kvad3mm7ov',
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const adminAuthenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: adminCredentials.username,
        Password: adminCredentials.password,
      });
    const adminCognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: adminCredentials.username,
      Pool: userPool,
    });
    adminCognitoUser.authenticateUser(adminAuthenticationDetails, {
      onSuccess: session => {
        // The admin is now authenticated, proceed to delete the user.
        const userData = {
          Username: usernameToDelete,
          Pool: userPool,
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.deleteUser((err, result) => {
          if (err) {
            console.error('Error deleting user: ', err);
            reject(err);
          } else {
            console.log('User deleted successfully: ', result);
            resolve(result);
          }
        });
      },
      onFailure: err => {
        console.error('Admin authentication failed: ', err);
        reject(err);
      },
    });
  });
};

module.exports = { adminDeleteUser };
