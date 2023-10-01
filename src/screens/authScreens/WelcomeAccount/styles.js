import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  innerContainer: {
    marginHorizontal: '20@ms0.3',
  },
  welcomeTxt: {
    fontSize: '21@ms0.3',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: '15@ms0.3',
    color: Colors.white,
  },
  accountTxt: {
    fontSize: '22@ms0.3',
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.white,
    marginTop: '25@ms0.3',
    letterSpacing: '0.5@ms0.3',
    fontStyle: 'italic',
    lineHeight: '26@ms0.3',
  },
  sideTxt: {
    fontSize: '13@ms0.3',
    color: 'rgba(255, 255, 255, 0.66)',
    marginTop: '5@ms0.3',
    lineHeight: '20@ms0.3',
    fontWeight: '400',
    fontFamily: Fonts.Regular,
    marginStart: '20@ms0.3',
  },
  btnContainer: {
    marginTop: '55@ms0.3',
  },
  blueButtonContainer: {
    height: '53@ms0.3',
    marginHorizontal: '0@ms0.3',
  },
  blueButtonTxt: {
    fontSize: '14@ms0.3',
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
  itemTitle: {
    fontFamily: Fonts.Regular,
    fontSize: '15@ms0.3',
    fontWeight: '400',
    lineHeight: '18@ms0.3',
    color: Colors.white,
  }
});
