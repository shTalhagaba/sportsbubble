import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground,
  },
  signupTxt: {
    fontSize: '20@ms0.3',
    fontWeight: '800',
    textAlign: 'center',
    color: Colors.white,
  },
  checkBoxTxt: {
    fontSize: '13@ms0.3',
    fontWeight: '500',
    color: Colors.white,
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: '80%',
  },
  checkBoxTxt1: {
    fontSize: '13@ms0.3',
    fontWeight: '500',
    color: Colors.white,
  },
  checkBoxTxt2: {
    fontSize: '13@ms0.3',
    fontWeight: '500',
    color: Colors.white,
    // maxWidth: "90%"
  },
  checkBoxGreenTxt: {
    fontSize: '13@ms0.3',
    fontWeight: '800',
    textAlign: 'center',
    color: Colors.lightGreen,
  },
  innerContainer: {
    marginHorizontal: '20@ms0.3',
  },
  termConditionContainer: {
    // flexDirection: 'row',
    marginStart: '10@ms0.3',
    maxWidth: '80%',
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 15
  },
  termsCondition: {
    color: Colors.white,
    fontSize: '13@ms0.3',
    fontWeight: '500',
  },
  termsConditionBold: {
    color: '#69A833',
    fontSize: '13@ms0.3',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: '800',
  },
  chekboxContainer: {
    flexDirection: 'row',
    marginTop: '21@ms0.3',
  },
  uncheckBox: {
    width: '18@ms0.3',
    height: '18@ms0.3',
    borderRadius: '18@ms0.3',
    borderWidth: '1@ms0.3',
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: '6@ms0.3',
  },
  modalContainer: {
    marginTop: '0@ms0.3',
    paddingVertical: '40@ms0.3',
  },
  accountTxt: {
    fontSize: '15@ms0.3',
    textAlign: 'center',
    color: Colors.white,
    marginTop: '20@ms0.3',
    marginBottom: '5@ms0.3',
    fontWeight: '400',
    fontFamily: Fonts.Regular,
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
});
