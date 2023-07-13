import { Colors, Fonts } from 'src/utils'
import { ScaledSheet } from "react-native-size-matters";
const styles = ScaledSheet.create({
    container: {
        backgroundColor: Colors.mediumBlue,
        paddingStart: "10@ms0.3",
        marginTop: "10@ms0.3",
        borderRadius: "16@ms0.3",
        height: "58@ms0.3",
    },
    innerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    headingTxt: {
        flex: 1,
        fontFamily: Fonts.Regular,
        fontSize: "16@ms0.3",
        fontWeight: "500",
        lineHeight: "21@ms0.3",
        color: Colors.white,
        marginStart: "15@ms0.3",
    },
    rightArrowIcon: {
        height: "9@ms0.3",
        width: "16@ms0.3",
        marginRight: "17@ms0.3",
        tintColor: Colors.lightBlue
    },
})

export default styles