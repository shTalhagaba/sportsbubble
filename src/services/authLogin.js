import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import CognitoPool from '.'

const userLogin = async (email, password) => {
  return await new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: CognitoPool
    })
    const details = new AuthenticationDetails({
      Username: email,
      Password: password
    })
    user.authenticateUser(details, {
      onSuccess: (data) => {
        resolve(data)
      },
      onFailure: (err) => {
        reject(err)
      },
      newPasswordRequired: (data) => {
        resolve(data)
      }
    })
  })
}

export { userLogin }
