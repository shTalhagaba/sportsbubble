import { Modal, Text, View } from 'react-native'
import React from 'react'
import { BallIndicator } from 'react-native-indicators'
import {Colors} from 'src/utils'
import styles from './styles'
const LoaderModal = (props) => {
   return (
        <Modal
            transparent
            visible={props.visible}
        >
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <BallIndicator size={40} count={10} color={Colors.appColor}/>
                    {props.loadingText != '' ? <View style={styles.loadingText}>
                        <Text style={{color:'white'}}>{props.loadingText}</Text>
                    </View> : null}
                </View>
            </View>
        </Modal>
    )
}

export default LoaderModal

