import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  loginTxt: {
    fontSize: '21@ms0.3',
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
    marginHorizontal: '16@ms0.3',
  },
  forgotTxt: {
    fontSize: '15@ms0.3',
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.darkOrange,
    marginVertical: '30@ms0.3',
    fontFamily: Fonts.Regular,
    lineHeight: '22@ms0.3'
  },
  accountTxt: {
    fontSize: '15@ms0.3',
    textAlign: 'center',
    color: Colors.white,
    marginVertical: '1@ms0.3',
    fontWeight: '400',
    fontFamily: Fonts.Regular,
  },
  blueButtonContainer: {
    height: '53@ms0.3',
    marginHorizontal: '0@ms0.3',
  },
  blueButtonTxt: {
    fontSize: '14@ms0.3',
  }
});
