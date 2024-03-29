import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backBlack,
  },
  sbContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    alignContent: 'center',
    alignSelf: 'center',
  },
  versionTxt: {
    fontSize: "18@ms0.3",
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontStyle: "italic"
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
  logoStyle: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: "230@ms0.3",
    width: "230@ms0.3",
    alignSelf: 'center'
  },
});
