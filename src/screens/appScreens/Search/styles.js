import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";


export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground
  },
  listContiner: {
    paddingRight: "0@ms0.3",
    marginVertical: "0@ms0.3",
    paddingVertical: "4@ms0.3",
  },
  innerContainer: {
    flexDirection: "row"
  },
  searchContainer: {
    // flexDirection: 'row',
    height: '58@ms0.3',
    borderRadius: '16@ms0.3',
    justifyContent: 'center',
    backgroundColor: Colors.mediumBlue,
    marginVertical: '10@ms0.3',
  },
  searchImage: {
    height: '18@ms0.3',
    width: '18@ms0.3',
    marginHorizontal: '10@ms0.3',
    tintColor: Colors.white,
  },
  crossImage: {
    height: '12@ms0.3',
    width: '12@ms0.3',
    marginHorizontal: '10@ms0.3',
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
  },
  searchTxt: {
    letterSpacing: 0.75,
    color: Colors.white,
    fontSize: '16@ms0.3',
    flex: 1,
    fontWeight: '600',
    padding: '0@ms0.3',
    fontFamily: Fonts.Regular,
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
    height: "80@ms0.3",
    width: "80@ms0.3",
    backgroundColor: Colors.mediumBlue,
    justifyContent: "center",
    alignItems: "center"
  },
  imageIcon: {
    height: "65@ms0.3",
    width: "65@ms0.3",
  },
  userNameContainer: {
    flex: 1,
    marginStart: "13@ms0.3",
    alignSelf: "center"
  },
  titleTxt: {
    fontSize: "16@ms0.3",
    fontWeight: "700",
    lineHeight: "24@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: "20@ms0.3",
  },
  textWhite: {
    color: Colors.white
  },
  eventTxt: {
    fontSize: "14@ms0.3",
    fontWeight: "400",
    lineHeight: "20@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  emptyTxt: {
    letterSpacing: 0.75,
    color: Colors.white,
    fontSize: "20@ms0.3",
    flex: 1,
    fontWeight: "600",
    padding: "0@ms0.3",
    fontFamily: Fonts.Regular,
    alignContent: 'center',
    textAlign: 'center',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: "40@ms0.3",
  }
});
