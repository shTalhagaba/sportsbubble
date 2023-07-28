import { Colors, Fonts } from 'src/utils'
import { ScaledSheet } from "react-native-size-matters";



const styles = ScaledSheet.create({

    container: {
        backgroundColor: Colors.mediumBlue,
        paddingStart: "10@ms0.3",
        marginTop: "20@ms0.3",
        borderRadius: "15@ms0.3",
        height: "55@ms0.3",
    },
    leftIcon: {
        height: "16@ms0.3",
        width: "16@ms0.3",
        alignSelf: "center",
        tintColor: Colors.white,
        marginHorizontal: "10@ms0.3",
    },
    innerContainer: {
        height: "30@ms0.3",
        flex: 1,
        flexDirection: "row",
        borderRadius: "12@ms0.3",


    },
    headingTxt: {
        fontSize: "14@ms0.3",
        fontWeight: "400",
        lineHeight: "24@ms0.3",
        color: Colors.blackGrey,
        fontFamily: Fonts.Regular,
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
        fontSize: "18@ms0.3",
        fontWeight: "500",
        lineHeight: "21@ms0.3",
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