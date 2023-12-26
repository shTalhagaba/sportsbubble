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
    width: '45@ms0.3',
    height: '45@ms0.3',
    resizeMode: 'cover',
  },
  powerImage: {
    width: '165@ms0.3',
    height: '75@ms0.3',
    resizeMode: 'cover',
    tintColor: Colors.white,
  },
  versionTxt: {
    fontSize: '18@ms0.3',
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontStyle: 'italic',
  },
  sbContainer: {
    height: '25%',
    alignItems: 'center',
  },
  mainTabContainer: {
    marginHorizontal: '20@ms0.3',
    flex: 1,
  },
  btnContainer: {
    marginTop: '24@ms0.3',
  },
  contentTxt: {
    color: Colors.white,
    marginVertical: '2@ms0.3',
  },
  contentTxtTop: {
    color: Colors.white,
    marginTop: '15@ms0.3',
  }
});
