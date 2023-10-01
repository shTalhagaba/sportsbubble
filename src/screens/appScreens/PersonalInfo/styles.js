import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts } from 'src/utils';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  headerTxt: {
    fontSize: '21@ms0.3',
    fontWeight: '900',
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  cancelAccountTxt: {
    fontSize: '16@ms0.3',
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.darkOrange,
    fontFamily: Fonts.Regular,
    marginVertical: '40@ms0.3',
    fontStyle: 'italic',
  },
  btnContainer: {
    marginTop: '32@ms0.3',
    height: '53@ms0.3',
    marginHorizontal: '0@ms0.3',
  },
  btnContainerTxt: {
    fontSize: '14@ms0.3',
  },
  innerContainer: {
    marginHorizontal: '16@ms0.3',
    flex: 1,
  },
  headerTxtStyle: {
    color: Colors.white70,
  },
  itemTitle: {
    fontFamily: Fonts.Regular,
    fontSize: '15@ms0.3',
    fontWeight: '400',
    lineHeight: '18@ms0.3',
    color: Colors.white,
  },
  dropdownItem: {
    flex: 1,
    height: '40@ms0.3',
    flexDirection: 'row',
    marginHorizontal: '10@ms0.3',
    paddingHorizontal: '30@ms0.3',
    paddingTop: '10@ms0.3',
    backgroundColor: Colors.blueGrey
  },
  openStyle: {
    position: 'absolute',
    top: '65@ms0.3',
    zIndex: 1000,
    width: '98%',
  },
});
