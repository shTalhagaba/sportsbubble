import { Colors, Fonts } from 'src/utils'
import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Colors.mediumGreen,
        paddingStart: "10@ms0.3",
        marginTop: "10@ms0.3",
        borderRadius: "15@ms0.3",
        height: "55@ms0.3",
        width: "280@ms0.3",
        alignSelf: 'center'
    },
    innerContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: 'center',
    },
    btnTxt: {
        fontFamily: Fonts.Regular,
        fontSize: "17@ms0.3",
        fontWeight: "700",
        lineHeight: "22@ms0.3",
        color: Colors.white,
        alignSelf: 'center',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    iconContainer: {
        justifyContent: "center",
    },
    eyeIcon: {
        height: "28@ms0.3",
        width: "28@ms0.3",
        marginLeft: "12@ms0.3",
    },
})

export default styles