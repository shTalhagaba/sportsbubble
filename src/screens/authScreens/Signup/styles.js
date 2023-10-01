import { Colors } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    signupTxt: {
        fontSize: "22@ms0.3",
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.white
    },
    checkBoxTxt: {
        fontSize: "14@ms0.3",
        fontWeight: "500",
        color: Colors.white,
        justifyContent: "center",
        alignSelf: "center",
        maxWidth: "80%"
    },
    checkBoxGreenTxt: {
        fontSize: "14@ms0.3",
        fontWeight: "800",
        textAlign: "center",
        color: Colors.lightGreen,
    },
    innerContainer: {
        marginHorizontal: "20@ms0.3",
    },
    termConditionContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        marginStart: "10@ms0.3"
    },
    chekboxContainer: {
        flexDirection: "row",
        marginTop: "21@ms0.3"
    },
    uncheckBox: {
        width: "18@ms0.3",
        height: "18@ms0.3",
        borderRadius: "18@ms0.3",
        borderWidth: "1@ms0.3",
        borderColor: Colors.white,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        marginTop: "0@ms0.3",
        paddingVertical: "40@ms0.3"
    }
});
