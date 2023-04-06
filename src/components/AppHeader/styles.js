import { Platform } from 'react-native'
import { Colors } from 'src/utils'
import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    headerContainer: {
        height: "70@ms0.3",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.transparent,
        marginTop: Platform.OS === 'ios' ? "25@ms0.3" : "1@ms0.3",
    },
    leftArrowIcon: {
        width: "25@ms0.3",
        height: "25@ms0.3",
        resizeMode: "cover",
    },
    rightIcon: {
        width: "20@ms0.3",
        height: "20@ms0.3",
        resizeMode: "cover",
    },

    headerCenterContainer: {
        flex: 1,
        alignItems: "center",
    },
    centerImage: {
        height: "28@ms0.3",
        width: "142@ms0.3",
    },
    iconContainer: {
        width: "15%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

})

export default styles