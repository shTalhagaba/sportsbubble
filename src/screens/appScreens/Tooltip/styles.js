import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 60 : 0,
    },
    renderItemContainer: {
        width: Dimensions.get('screen').width,
    },
    tooltipImage: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height-10,
        marginBottom: 30,
    },
})

export default styles