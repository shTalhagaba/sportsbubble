import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.darkBlue80,
  },
  checkBoxContainer: {
    backgroundColor: Colors.backBlack,
    width: '84%',
    alignSelf: 'center',
    marginTop: '160@ms0.3',
    borderWidth: '1@ms0.3',
    borderColor: Colors.white,
    borderRadius: '16@ms0.3',
  },
  headerTxt: {
    fontSize: '22@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: '20@ms0.3',
    marginTop: '24@ms0.3',
    lineHeight: '30@ms0.3',
  },
  desTxt: {
    fontSize: '20@ms0.3',
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: '8@ms0.3',
    paddingHorizontal: '20@ms0.3',
    lineHeight: '30@ms0.3',
  },
  blackBtnContainer: {
    flex: 1,
    backgroundColor: Colors.backBlack,
    borderWidth: '2@ms0.3',
    borderColor: Colors.white,
  },
  orangeBtnContainer: {
    flex: 1,
    backgroundColor: Colors.backBlack,
    borderWidth: '2@ms0.3',
    borderColor: Colors.darkOrange,
  },
  rowBtn: {
    flexDirection: 'row',
    marginHorizontal: '10@ms0.3',
    paddingBottom: '30@ms0.3',
  },
  columnBtn: {
    marginHorizontal: '10@ms0.3',
    paddingBottom: '30@ms0.3',
  },
  orangeTxt: {
    color: Colors.darkOrange,
  },
  inputField: {
    letterSpacing: 0.75,
    color: Colors.white,
    fontSize: '16@ms0.3',
    flex: 1,
    fontWeight: '600',
    padding: '0@ms0.3',
    fontFamily: Fonts.Regular,
    marginStart: '10@ms0.3',
  },
  greenButtonContainer: {
    marginTop: "40@ms0.3",
    height: "53@ms0.3"
  },
  greenButtonTxt: {
    fontSize: '14@ms0.3',
  },
  blackBtnContainer2: {
    backgroundColor: Colors.backBlack,
    borderWidth: "2@ms0.3",
    borderColor: Colors.white,
    height: "53@ms0.3",
  },
  buttonStyle: {
    height: "53@ms0.3",
  },
});

export default styles;
