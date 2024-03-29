import {ScaledSheet} from 'react-native-size-matters';
import {Colors, Fonts} from 'src/utils';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  loginTxt: {
    fontSize: '20@ms0.3',
    fontWeight: '800',
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  leftArrowIcon: {
    width: '42@ms0.3',
    height: '42@ms0.3',
    resizeMode: 'cover',
  },
  powerImage: {
    width: '150@ms0.3',
    height: '65@ms0.3',
    resizeMode: 'cover',
    tintColor: Colors.white,
  },
  versionTxt: {
    fontSize: '17@ms0.3',
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontStyle: 'italic',
  },
  logoutTxt: {
    fontSize: '18@ms0.3',
    fontWeight: '500',
    color: Colors.darkOrange,
    fontFamily: Fonts.Regular,
    marginStart: '16@ms0.3',
  },
  sbContainer: {
    height: '21%',
    alignItems: 'center',
  },
  mainTabContainer: {
    marginHorizontal: '20@ms0.3',
    flex: 1,
  },
  logoutIcon: {
    height: '9@ms0.3',
    width: '16@ms0.3',
    marginTop: '5@ms0.3',
  },
  innerContainer: {
    marginTop: '24@ms0.3',
  },
});
