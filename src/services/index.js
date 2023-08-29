import {
  CognitoUserPool,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';
import Config from 'react-native-config';
import { Platform } from 'react-native';


const poolData = {
  UserPoolId: Platform.OS === "ios" ? Config.USER_POOL_ID : "us-west-2_nTZIRvqNk",
  ClientId: Platform.OS === 'ios' ? Config.CLIENT_ID : "2c4r8a30g1h8vu08kvad3mm7ov"
}
const awsConfig = new CognitoUserPool(poolData)
export default awsConfig
