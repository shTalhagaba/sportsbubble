import { Platform } from 'react-native'
import { Colors } from 'src/utils'
import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    headerContainer: {
        height: "85@ms0.3",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.transparent,
        paddingTop: Platform.OS === 'ios' ? "25@ms0.3" : "25@ms0.3",
    },
    leftArrowIcon: {
        width: "27@ms0.3",
        height: "27@ms0.3",
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
        height: "30@ms0.3",
        width: "148@ms0.3",
    },
    iconContainer: {
        width: "25%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

})

export default styles