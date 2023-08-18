import { CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js'
import Config from 'react-native-config';

const poolData: ICognitoUserPoolData = {
  // UserPoolId: Config.USER_POOL_ID,
  // ClientId: Config.CLIENT_ID
  UserPoolId: 'us-west-2_nTZIRvqNk',
  ClientId: '2c4r8a30g1h8vu08kvad3mm7ov'
}
const awsConfig = new CognitoUserPool(poolData)
export default awsConfig
