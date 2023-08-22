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

        // Use the provided mfaSession parameter
        cognitoUser.sendMFACode(otp, {
            mfaSession: mfaSession,
            onSuccess: () => {
                console.log('OTP verification successful');
                resolve();
            },
            onFailure: (err) => {
                console.error('OTP verification failed:', err);
                reject(err);
            },
        });
    });
};

export { userOTP };
