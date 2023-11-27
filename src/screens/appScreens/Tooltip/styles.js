import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 40 : 0,

    },
    renderItemContainer: {
        width: Dimensions.get('screen').width,
    },
    tooltipImage: {
        width: "100%",
        height: "100%",

    },
})

export default styles