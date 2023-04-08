import { Colors } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";


export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    signupTxt: {
        fontSize: "20@ms0.3",
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.white
    },
    innerContainer: {
        marginHorizontal: "20@ms0.3",
    },
});
