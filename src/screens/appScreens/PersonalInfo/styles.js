import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from 'src/utils';

export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    headerTxt: {
        fontSize: "21@ms0.3",
        fontWeight: "900",
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.Regular,
    },
    cancelAccountTxt: {
        fontSize: "16@ms0.3",
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.darkOrange,
        fontFamily: Fonts.Regular,
        marginVertical: "40@ms0.3",
        fontStyle: "italic"
    },
    btnContainer: {
        marginTop: "32@ms0.3",
        height: '53@ms0.3',
        marginHorizontal: '0@ms0.3',
      },
      btnContainerTxt: {
        fontSize: '14@ms0.3',
      },
    innerContainer: {
        marginHorizontal: "20@ms0.3",
        flex: 1,
    },
    headerTxtStyle: {
        color: Colors.white70
    }
});
