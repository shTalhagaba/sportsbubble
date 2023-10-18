import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import CognitoPool from '.'

const userData = async (email) => {
    console.log("Email => ", email);
    console.log("CognitoPool => ", CognitoPool);

    return new Promise((resolve, reject) => {
        try {
            const userData = {
                Username: email,
                Pool: CognitoPool,
            };
            const cognitoUser = new CognitoUser(userData);

            cognitoUser.getUser((err, result) => {
                console.log("err => ", err);
                console.log("result => ", result);


                if (err) {
                    if (err.code === 'UserNotFoundException') {
                        console.log('User does not exist.');
                        reject(err);
                    } else {
                        console.log('An error occurred:', err.message);
                        reject(err);
                    }
                } else {
                    console.log('User exists.');
                    console.log('User details:', result);
                    resolve(result);
                }
            });
        } catch (error) {
            console.error('An error occurred:', error);
            reject(error);
        }
    });
};


export { userData };
