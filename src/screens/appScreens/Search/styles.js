import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground
  },
  listContainer: {
    paddingRight: "0@ms0.3",
    marginVertical: "0@ms0.3",
    paddingVertical: "4@ms0.3",
  },
  innerContainer: {
    flexDirection: "row"
  },
  searchContainer: {
    flexDirection: 'row',
    height: '53@ms0.3',
    borderRadius: '15@ms0.3',
    justifyContent: 'center',
    backgroundColor: Colors.mediumBlue,
    marginBottom: '8@ms0.3',
    alignSelf: "center",
    alignItems: "center",
  },
  searchImage: {
    height: '18@ms0.3',
    width: '18@ms0.3',
    marginStart: '10@ms0.3',
    tintColor: Colors.white,
  },
  searchImageTwo: {
    height: '12@ms0.3',
    width: '12@ms0.3',
    marginStart: '5@ms0.3',
    tintColor: Colors.white,
    opacity: 0.7
  },
  crossImage: {
    height: '12@ms0.3',
    width: '12@ms0.3',
    tintColor: Colors.white,
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
  searchTxt: {
    letterSpacing: 0.75,
    color: Colors.white,
    fontSize: '14@ms0.3',
    flex: 1,
    fontWeight: '500',
    fontFamily: Fonts.Regular,
    marginStart: 10,
    opacity: 0.7
  },
  focus: {
    borderWidth: '2@ms0.3',
    borderColor: Colors.lightBlue,
  },
  blur: {
    borderWidth: '1@ms0.3',
    borderColor: Colors.lightGreen,
  },
  imageContainer: {
    height: "69@ms0.3",
    width: "67@ms0.3",
    backgroundColor: Colors.mediumBlue,
    justifyContent: "center",
    alignItems: "center"
  },
  imageIcon: {
    height: "61@ms0.3",
    width: "60@ms0.3",
  },
  userNameContainer: {
    flex: 1,
    marginStart: "9@ms0.3",
    alignSelf: "center"
  },
  titleTxt: {
    fontSize: "15@ms0.3",
    fontWeight: "700",
    lineHeight: "22@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: "20@ms0.3",
    marginTop: "10@ms0.3"
  },
  textWhite: {
    color: Colors.white
  },
  eventTxt: {
    fontSize: "13@ms0.3",
    fontWeight: "400",
    lineHeight: "18@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  emptyTxt: {
    letterSpacing: 0.75,
    color: Colors.white,
    fontSize: "21@ms0.3",
    flex: 1,
    fontWeight: "600",
    padding: "0@ms0.3",
    fontFamily: Fonts.Regular,
    alignContent: 'center',
    textAlign: 'center',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: "45@ms0.3",
  }
});
