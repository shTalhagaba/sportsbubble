import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  loginTxt: {
    fontSize: '22@ms0.3',
    fontWeight: '800',
    textAlign: 'center',
    color: Colors.white,
  },
  signupTxt: {
    fontSize: '16@ms0.3',
    fontWeight: '800',
    textAlign: 'center',
    color: Colors.greenText,
    marginVertical: '10@ms0.3',
    fontFamily: Fonts.Regular,
    fontStyle: 'italic',
  },
  innerContainer: {
    marginHorizontal: '20@ms0.3',
  },
  forgotTxt: {
    fontSize: '16@ms0.3',
    fontWeight: '900',
    textAlign: 'center',
    color: Colors.darkOrange,
    marginVertical: '30@ms0.3',
  },
  accountTxt: {
    fontSize: '16@ms0.3',
    textAlign: 'center',
    color: Colors.white,
    marginVertical: '1@ms0.3',
    fontWeight: '400',
  },
});
