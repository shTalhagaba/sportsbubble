import { Colors, Fonts } from 'src/utils'
import { ScaledSheet } from "react-native-size-matters";



const styles = ScaledSheet.create({

    container: {
        backgroundColor: Colors.blueGrey,
        paddingStart: "10@ms0.3",
        marginTop: "16@ms0.3",
        borderRadius: "15@ms0.3",
        height: "60@ms0.3",
        marginStart: "10@ms0.3",
        paddingVertical: "5@ms0.3",
        flexDirection: "row"
    },
    leftIcon: {
        height: "12@ms0.3",
        width: "12@ms0.3",
        tintColor: Colors.white,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    innerContainer: {
        flex: 1
    },
    headerTxt: {
        fontSize: "12@ms0.3",
        fontWeight: "500",
        lineHeight: "24@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        marginStart: "10@ms0.3",
    },
    inputContainer: {
        borderRadius: "38@ms0.3",
        height: "48@ms0.3",
        flexDirection: "row",
        alignItems: "center",
        borderColor: Colors.lightGrey,
        borderWidth: "1@ms0.3",
    },

    inputField: {
        flex: 1,
        fontFamily: Fonts.Regular,
        fontSize: "16@ms0.3",
        fontWeight: "500",
        lineHeight: "24@ms0.3",
        padding: "0@ms0.3",
        color: Colors.white,
    },
    iconContainer: {
        justifyContent: "center",

    },
    eyeIcon: {
        height: "16@ms0.3",
        width: "16@ms0.3",
        marginRight: "17@ms0.3",
        tintColor: Colors.white,
    },
})

export default styles