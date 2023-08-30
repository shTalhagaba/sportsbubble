import {Colors, Fonts} from 'src/utils';
import {ScaledSheet} from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  loginTxt: {
    fontSize: '20@ms0.3',
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
  leftArrowIcon: {
    width: '42@ms0.3',
    height: '42@ms0.3',
    resizeMode: 'cover',
  },
  powerImage: {
    width: '155@ms0.3',
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
  sbContainer: {
    height: '21%',
    alignItems: 'center',
  },
  mainTabContainer: {
    marginHorizontal: '20@ms0.3',
    flex: 1,
  },
  btnContainer: {
    marginTop: '24@ms0.3',
  },
});
