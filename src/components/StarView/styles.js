import { Colors, Fonts } from 'src/utils'
import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
    fvrtIcon: {
        height: '21@ms0.3',
        width: '21@ms0.3',
        marginRight: '15@ms0.3',
      },
      starView: { 
        position: 'absolute', 
        right: 0, 
        alignSelf: 'center' 
      },
})

export default styles