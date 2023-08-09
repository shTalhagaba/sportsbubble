import { Colors, Fonts } from 'src/utils';
import { ScaledSheet } from "react-native-size-matters";


export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColorBackground
    },
    headerTxt: {
        fontSize: "22@ms0.3",
        fontWeight: "800",
        textAlign: "center",
        color: Colors.white
    },
    desTxt: {
        fontSize: "18@ms0.3",
        fontWeight: "500",
        alignSelf: "center",
        color: Colors.white,
        marginTop: "16@ms0.3",
        maxWidth: "80 %",
        lineHeight: "25@ms0.3",
        textAlign: "center"
    },
    innerContainer: {
        marginHorizontal: "20@ms0.3",
        marginTop: "16@ms0.3"
    },
    listContiner: {
        marginVertical: "8@ms0.3",
        paddingVertical: "5@ms0.3",
        borderRadius: "16@ms0.3",
        backgroundColor: "#2B3B50",
        paddingHorizontal: "4@ms0.3"
    },
    innerListContainer: {
        flexDirection: "row",
        alignItems: 'center'
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
    titleTxt: {
        fontSize: "16@ms0.3",
        fontWeight: "800",
        lineHeight: "25@ms0.3",
        color: Colors.white,
        fontFamily: Fonts.Regular,
    },
    uncheckBox: {
        height: "19@ms0.3",
        width: "19@ms0.3",
        borderWidth: "1.3@ms0.3",
        borderRadius: "20@ms0.3",
        marginRight: "20@ms0.3",
        justifyContent: "center"
    },
    tickImage: {
        height: "11@ms0.3",
        width: "11@ms0.3",
        tintColor: Colors.darkOrange,
        alignSelf: "center"
    },
    doneButton: {
        position:'absolute',
        bottom: "40@ms0.3",
        marginHorizontal: "20@ms0.3",
    }
});
