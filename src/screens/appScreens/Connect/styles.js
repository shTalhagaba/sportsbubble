import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";
export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground
  },
  listContiner: {
    paddingRight: "5@ms0.3",
    marginVertical: "10@ms0.3",
    paddingVertical: "5@ms0.3",
    alignItems: "center"
  },
  itemListContainer: {
    paddingRight: "0@ms0.3",
    marginVertical: "1@ms0.3",
    paddingVertical: "5@ms0.3",
  },
  itemInnerContainer: {
    flexDirection: "row"
  },
  rightIcon: {
    height: "10@ms0.3",
    width: "16@ms0.3",
  },
  itemContainer: {
    height: "80@ms0.3",
    width: "80@ms0.3",
    justifyContent: "center",
    alignItems: "center"
  },
  logoImageContainer: {
    height: "75@ms0.3",
    // width: "75@ms0.3",
    justifyContent: "center",
    alignSelf: "center",
    margin: 20,
    borderRadius: 16,
  },
  imageContainer: {
    height: "75@ms0.3",
    width: "75@ms0.3",
    backgroundColor: Colors.mediumBlue,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 16,
  },
  imageIcon: {
    height: "65@ms0.3",
    width: "65@ms0.3",
  },
  titleTxt: {
    fontSize: "18@ms0.3",
    fontWeight: "800",
    lineHeight: "25@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
    width: '85%',
  },
  eventTxt: {
    fontSize: "14@ms0.3",
    fontWeight: "400",
    lineHeight: "20@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
    width: '85%',
  },
  dateEventTxt: {
    fontSize: "14@ms0.3",
    fontWeight: "400",
    lineHeight: "20@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  watchOptions: {
    fontSize: "22@ms0.3",
    fontWeight: "800",
    lineHeight: "30@ms0.3",
    color: Colors.lightGreen,
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
    marginTop: 40,
    textAlign: "center"
  },
  wayToWatch: {
    fontSize: "20@ms0.3",
    fontWeight: "800",
    lineHeight: "30@ms0.3",
    color: Colors.lightGreen,
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
    marginTop: 40,
    textAlign: "center"
  },
  connectingText: {
    fontSize: "18@ms0.3",
    fontWeight: "500",
    lineHeight: "22@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
    marginTop: "20@ms0.3",
    textAlign: "center",
    maxWidth: "70%",
    alignSelf: "center",
    fontStyle: 'italic'
  },
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.mediumBlue,
    height: "110@ms0.3",
    alignItems: 'center',
    paddingHorizontal: "15@ms0.3",
  },
  sliderInnerContainer: {
    flex: 1,
    marginHorizontal: "5@ms0.3",
  },
  sliderImageBackground: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  sliderIcon: {
    height: "32@ms0.3",
    width: "32@ms0.3",
    paddingVertical: "15@ms0.3",
    tintColor: Colors.white
  },
  sliderTxt: {
    fontSize: "14@ms0.3",
    fontWeight: "600",
    lineHeight: "24@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  sbContainer: {
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20
  },
  sbImage: {
    height: "150@ms0.3",
    alignItems: "center",
    justifyContent: 'center',
    paddingTop: "20@ms0.3",
  },
  flexOnly: {
    flex: 1
  },
  leftArrowIcon: {
    width: "45@ms0.3",
    height: "45@ms0.3",
    resizeMode: "cover",
  },
  powerImage: {
    width: "165@ms0.3",
    height: "75@ms0.3",
    resizeMode: "cover",
    tintColor: Colors.white
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    marginTop: "40@ms0.3",
    marginHorizontal: "20@ms0.3",
  },
  imageStyle: {
    height: "60@ms0.3",
    marginTop: "30@ms0.3",
  },
  logoImageStyle: {
    height: "100@ms0.3",
    marginTop: "40@ms0.3",
    width: "163@ms0.3"
  },
  flexRow: {
    flexDirection: 'row'
  },
  userNameContainer: {
    paddingStart: "13@ms0.3",
    height: "80@ms0.3",
    justifyContent: "center",
    position: 'absolute',
    left: "80@ms0.3",
  },
});
