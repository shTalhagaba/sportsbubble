import {
  CognitoUserPool,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';
import Config from 'react-native-config';

const poolData = {
  UserPoolId: Config.USER_POOL_ID,
  ClientId: Config.CLIENT_ID
}
const awsConfig = new CognitoUserPool(poolData)
export default awsConfig
