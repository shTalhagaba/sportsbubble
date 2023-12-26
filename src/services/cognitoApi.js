import {
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js'
import CognitoPool from '.'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCognitoUser = (email) => {
  try {
    const userData = {
      Username: email,
      Pool: CognitoPool
    }
    return new CognitoUser(userData)
  } catch (error) {
    throw new Error('Failed to fetch user.')
  }
}

export const refreshSession = (refreshToken, cognitoUser) => {
  return new Promise((resolve, reject) => {
    cognitoUser.refreshSession(
      new CognitoRefreshToken({
        RefreshToken: refreshToken
      }),
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

export const CognitoAPI = async (
  reduxData,
  action,
  values = null
) => {
  const email = reduxData?.userData?.email
  const refreshToken =  await AsyncStorage.getItem('refreshToken');
  const cognitoUser = getCognitoUser(email)
  await refreshSession(JSON.parse(refreshToken), cognitoUser)
  switch (action) {
    case 'updateUser':
      return await handleUserData(cognitoUser, values)
    case 'globalLogout':
      return await globalLogout(cognitoUser)
    default:
      return null
  }
}

const handleUserData = async (user, dma) => {
  return new Promise((resolve, reject) => {
    CognitoPool.getCurrentUser().getSession((err, res) => {
      if (err) {
        reject(err)
      }
      const attributes = [
        new CognitoUserAttribute({ Name: 'custom:dma', Value: dma }), // pronouns
      ];
      user.updateAttributes(attributes, (error, result) => {
        if (error) {
          reject(error)
        } else resolve(result)
      })
    })
  })
}

const globalLogout = async (user) => {
  return new Promise((resolve, reject) => {
    CognitoPool.getCurrentUser().getSession((err, res) => {
      if (err) {
        reject(err)
      }
      user.globalSignOut({
        onSuccess: (result) => {
          resolve(result)
        },
        onFailure: (error) => {
          reject(error)
        }
      })
    })
  })
}
