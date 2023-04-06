import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";


export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColorBackground
  },
  listContiner: {
    paddingRight: "0@ms0.3",
    marginVertical: "6@ms0.3",
    paddingVertical: "5@ms0.3",
  },
  innerContainer: {
    flexDirection: "row"
  },
  imageContainer: {
    height: "80@ms0.3",
    width: "80@ms0.3",
    backgroundColor: "#22364f",
    justifyContent: "center",
    alignItems: "center"
  },
  imageIcon: {
    height: "50@ms0.3",
    width: "50@ms0.3",
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
    fontSize: "13@ms0.3",
    fontWeight: "400",
    lineHeight: "20@ms0.3",
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
});
