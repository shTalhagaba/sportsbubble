import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

const forgoatPassword = (username) => {
    return new Promise((resolve, reject) => {
        const poolData = {
            UserPoolId: 'us-west-2_nTZIRvqNk',
            ClientId: '2c4r8a30g1h8vu08kvad3mm7ov'
        };

        const userPool = new CognitoUserPool(poolData);

        const userData = {
            Username: username,
            Pool: userPool
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function () {
                resolve('Password reset initiated successfully. Check your email for instructions.');
            },
            onFailure: function (err) {
                reject(`Failed to initiate password reset: ${err.message || err}`);
            },
            inputVerificationCode: function () {
                const newPassword = prompt('Enter new password: ');

                const verificationCode = prompt('Enter verification code sent to your email: ');
                cognitoUser.confirmPassword(verificationCode, newPassword, {
                    onSuccess: function () {
                        resolve('Password reset successful. You can now log in with your new password.');
                    },
                    onFailure: function (err) {
                        reject(`Failed to reset password: ${err.message || err}`);
                    }
                });
            }
        });
    });
}

export { forgoatPassword };

