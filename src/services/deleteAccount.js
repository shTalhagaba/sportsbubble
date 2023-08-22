import AmazonCognitoIdentity from 'amazon-cognito-identity-js';

const userDelete = (email) => {
    return new Promise((resolve, reject) => {
        const poolData = {
            UserPoolId: 'us-west-2_nTZIRvqNk',
            ClientId: '2c4r8a30g1h8vu08kvad3mm7ov',
        };

        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        const userData = {
            Username: email,
            Pool: userPool
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

    });
};

export { userDelete };
