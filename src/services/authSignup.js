import AmazonCognitoIdentity, { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const userSignup = async (fullName, lastName, email, password) => {
    return new Promise((resolve, reject) => {
        const userPool = new CognitoUserPool({
            UserPoolId: 'us-west-2_nTZIRvqNk',
            ClientId: '2c4r8a30g1h8vu08kvad3mm7ov'
        });
        const attributeList = [
            new CognitoUserAttribute({ Name: 'email', Value: email }),
            new CognitoUserAttribute({ Name: 'given_name', Value: fullName }),
            new CognitoUserAttribute({ Name: 'family_name', Value: lastName })
        ];
        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                console.error('Error signing up:', err);
                reject(err);
                return;
            }
            const cognitoUser = result.user;
            console.log('Successfully signed up. User:', cognitoUser.getUsername());
            resolve(cognitoUser);
        });
    });
};

export { userSignup };


