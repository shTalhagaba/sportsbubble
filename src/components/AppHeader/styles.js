import { Platform, StyleSheet } from 'react-native'
import { Colors, Fonts } from 'src/utils'
const styles = StyleSheet.create({
    headerContainer: {
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.transparent
    },
    leftArrowIcon: {
        width: 25,
        height: 25,
        resizeMode: "cover",
    },
    rightIcon: {
        width: 20,
        height: 20,
        resizeMode: "cover",
    },

    headerCenterContainer: {
        flex: 1,
        alignItems: "center",
    },
    centerImage: {
        height: 36,
        width: 161,
    },
    iconContainer: {
        width: "15%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

})

export default styles