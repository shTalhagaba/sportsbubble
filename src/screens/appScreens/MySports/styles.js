import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    listContainer: {
        marginVertical: "8@ms0.3",
        paddingVertical: "5@ms0.3",
        borderRadius: "16@ms0.3",
        backgroundColor: "#2B3B50",
        marginHorizontal: "20@ms0.3",
        paddingHorizontal: "4@ms0.3"
    },
    innerContainer: {
        flexDirection: "row",
        alignItems: 'center'
    },
    mangeFvrtContainer: {
        paddingVertical: "16@ms0.3",
    },
    imageIcon: {
        height: "48@ms0.3",
        width: "48@ms0.3",
    },
    userNameContainer: {
        paddingStart: "13@ms0.3",
        justifyContent: "center",
        flex: 1
    },
    mangeFavTxt: {
        fontSize: "22@ms0.3",
        fontWeight: "800",
        lineHeight: "25@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
        textAlign: "center"
    },
    titleTxt: {
        fontSize: "16@ms0.3",
        fontWeight: "800",
        lineHeight: "25@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
    },
    sliderContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.greyBackground,
        height: "120@ms0.3",
    },
    sliderInnerContainer: {
        flex: 1,
        marginHorizontal: "5@ms0.3",
        marginVertical: 5
    },
    sliderImageBackground: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    sliderIcon: {
        height: "32@ms0.3",
        width: "32@ms0.3",
        paddingVertical: "15@ms0.3",
        tintColor: Colors.white
    },
    fvrtIcon: {
        height: "24@ms0.3",
        width: "21@ms0.3",
        marginRight: "20@ms0.3"
    },
    sliderTxt: {
        fontSize: "14@ms0.3",
        fontWeight: "600",
        lineHeight: "24@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
    },
});
