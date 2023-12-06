import {
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import Config from 'react-native-config';
import { Platform } from 'react-native';

const poolData = {
  // UserPoolId: Config?.USER_POOL_ID ? Config?.USER_POOL_ID : "us-west-2_nTZIRvqNk",
  // ClientId: Config?.CLIENT_ID ? Config?.CLIENT_ID : "2c4r8a30g1h8vu08kvad3mm7ov"
  UserPoolId: "us-west-2_91WkQF1JR",
  ClientId: "3btdcsbotss0tc2nguf0jq3buh"
}
const awsConfig = new CognitoUserPool(poolData)
export default awsConfig
