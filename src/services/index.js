import {
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import Config from 'react-native-config';
import { Platform } from 'react-native';

const poolData = {
  UserPoolId: "us-west-2_nTZIRvqNk",
  ClientId: "2c4r8a30g1h8vu08kvad3mm7ov"
}
const awsConfig = new CognitoUserPool(poolData)
export default awsConfig
