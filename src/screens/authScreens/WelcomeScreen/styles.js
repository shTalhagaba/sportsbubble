import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from 'src/utils';

export default ScaledSheet.create({
    containerTop:{
        flex: 1,
        backgroundColor: Colors.darkBlue
    },
    container: {
        flex: 1,
        marginTop: "38@ms0.3",
        marginBottom: "10@ms0.3",
    },
    innerContainer: {
        flex: 1,
        backgroundColor: Colors.darkBlue90,
    },
    welcomeTxt: {
        fontSize: "23@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        fontWeight: "400",
        marginTop: "10@ms0.3",
        textAlign: "center"
    },
    liveSportTxt: {
        fontSize: "20@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        fontWeight: "900",
        marginTop: "65@ms0.3",
        textAlign: "center",
        fontStyle: "italic"
    },
    liveSportDesTxt: {
        fontSize: "18@ms0.3",
        color: Colors.white,
        // fontFamily: Fonts.Regular,
        fontWeight: "500",
        marginTop: "35@ms0.3",
        marginHorizontal: "10@ms0.3",
        textAlign: "center",
        lineHeight: "28@ms0.3",
        width:'85%',
        alignSelf:'center'
    },
    guestTxt: {
        fontSize: "15@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        fontWeight: "900",
        marginHorizontal: "10@ms0.3",
        lineHeight: "30@ms0.3",
        fontStyle: 'italic'
    },
    logoImage: {
        height: "48@ms0.3",
        width: "244@ms0.3",
        marginTop: "13@ms0.3",
        alignSelf: "center"
    },
    guestContainer: {
        flexDirection: "row",
        marginTop: "30@ms0.3",
        justifyContent: "center",
        alignItems: "center",
    },
    rightArrowImage: {
        width: "16@ms0.3",
        height: "9@ms0.3",
        tintColor: Colors.white
    },
    btnContainer: {
        marginHorizontal: "20@ms0.3",
    },
    freeBtnTxt: {
        fontSize: '14@ms0.3',
    },
    freeBtnContainer: {
        marginTop: "70@ms0.3",
        height: "53@ms0.3"
    },
    loginBtnTxt: {
        fontSize: '14@ms0.3',
    },
    loginBtnContainer: {
        marginTop: "20@ms0.3",
        height: "53@ms0.3"
    },
});
