import { Colors, Fonts } from "src/utils";
import { ScaledSheet } from "react-native-size-matters";


const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    height: "52@ms0.3",
    borderRadius: "12@ms0.3",
    alignItems: "center",
    backgroundColor: "#22364f",
    borderWidth: "1@ms0.3",
    borderColor: "#6a88b2",
    marginVertical: "10@ms0.3",
  },
  searchImage: {
    height: "18@ms0.3",
    width: "18@ms0.3",
    marginHorizontal: "10@ms0.3",
    tintColor: Colors.white
  },
  crossImage: {
    height: "12@ms0.3",
    width: "12@ms0.3",
    marginHorizontal: "10@ms0.3",
    tintColor: Colors.white
  },
  inputField: {
    letterSpacing: 0.75,
    color: Colors.white,
    fontSize: "16@ms0.3",
    flex: 1,
    fontWeight: "600",
    padding: "0@ms0.3",
    fontFamily: Fonts.Regular,
  },
});

export default styles;
