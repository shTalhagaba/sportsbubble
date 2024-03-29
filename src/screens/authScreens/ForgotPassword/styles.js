import {Colors, Fonts} from 'src/utils';
import {ScaledSheet} from 'react-native-size-matters';

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
    marginVertical: '5@ms0.3',
    fontSize: '16@ms0.3',
    fontWeight: '900',
    textAlign: 'center',
    color: Colors.greenText,
    fontFamily: Fonts.Regular,
    fontStyle: 'italic',
  },
  forgotTxt: {
    fontSize: '14@ms0.3',
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.white,
    marginVertical: '30@ms0.3',
  },
  accountTxt: {
    marginTop: '40@ms0.3',
    marginBottom: '10@ms0.3',
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
  },
});
