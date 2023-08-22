import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const userUpdateProfile = (fullName, lastName, zipCode, dob) => {
    return new Promise((resolve, reject) => {
        const poolData = {
            UserPoolId: 'us-west-2_nTZIRvqNk',
            ClientId: '2c4r8a30g1h8vu08kvad3mm7ov',
        };
        const userPool = new CognitoUserPool(poolData);

        const currentUser = userPool.getCurrentUser();

        if (currentUser) {
            const cognitoUser = userPool.getCurrentUser();

            const attributeList = [
                new CognitoUserAttribute({ Name: 'given_name', Value: fullName }),
                new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
                new CognitoUserAttribute({ Name: 'zipcode', Value: zipCode }),
                new CognitoUserAttribute({ Name: 'birthdate', Value: dob })
            ];

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
            console.log('User not authenticated.');
            reject(new Error('User not authenticated.'));
        }
    });
};

export { userUpdateProfile };
