import { Colors } from 'src/utils'
import { Dimensions } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";

const screenWidth = Dimensions.get('window').width;
const styles = ScaledSheet.create({
    container: {
        borderRadius: 16,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'transparent',
    },
    innerContainer: {
        backgroundColor: Colors.mediumBlue,
        borderWidth: 2,
        borderRadius: 16,
        overflow: 'hidden',
        borderColor: Colors.mediumBlue,
        justifyContent: 'center',
        width: screenWidth / 4.6,
        height: screenWidth / 4.6,
    },
    innerWebContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: Colors.black15,
    },
    htmlContainer: {
        width: screenWidth / 6,
        height: screenWidth / 6,
        backgroundColor: 'transparent', // Set background to transparent
    },
    htmlInnerContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: Colors.mediumBlue,
    }

})
export default styles
