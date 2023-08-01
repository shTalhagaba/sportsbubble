import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from 'src/utils';

export default ScaledSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.appColorBackground
        backgroundColor: Colors.backBlack

    },
    headerTxt: {
        fontSize: "22@ms0.3",
        fontWeight: "900",
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.Regular,
    },
    cancelAccountTxt: {
        fontSize: "20@ms0.3",
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.darkOrange,
        fontFamily: Fonts.Regular,
        marginVertical: "50@ms0.3",
        fontStyle: "italic"
    },
    btnContainer: {
        marginTop: "32@ms0.3",
    },
    innerContainer: {
        marginHorizontal: "20@ms0.3",
        flex: 1,
    },
    headerTxtStyle: {
        color: Colors.white70
    }
});
