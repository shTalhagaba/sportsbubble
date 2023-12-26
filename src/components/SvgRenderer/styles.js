import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
import { Colors } from 'src/utils';

const screenWidth = Dimensions.get('window').width;

const styles = ScaledSheet.create({
    container: {
        width: screenWidth / 2.5,
        height: screenWidth / 4,
    },
    innerContainer: {
        width: screenWidth / 2.5,
        height: screenWidth / 4,
        backgroundColor: 'transparent', // Set background to transparent
    },
    webContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'transparent',
    },
    webMainContainer: {
        backgroundColor: Colors.mediumBlue,
        borderWidth: 2,
        borderRadius: 16,
        overflow: 'hidden',
        borderColor: Colors.mediumBlue,
        justifyContent: 'center',
        width: screenWidth / 4.6,
        height: screenWidth / 4.6,
    },
    webMainContainerFlag: {
        backgroundColor: Colors.mediumBlue,
        overflow: 'hidden',
        justifyContent: 'center',
        width: screenWidth / 5.8,
        height: screenWidth / 5.8,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    webInnerContainer: {
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
        margin: 15,
        overflow: 'hidden',
    },
    htmlContainerSport: {
        width: screenWidth / 7,
        height: screenWidth / 7,
        backgroundColor: 'transparent', // Set background to transparent
        margin: 15,
        overflow: 'hidden',
    },
    htmlInnerContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mediumBlue,
    }
});

export default styles;
