import { Colors } from 'src/utils'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={[styles.container, props.Contianer,props.blue?{ backgroundColor: Colors.buttonBlue,}:{}]}>
            <View style={[styles.innerContainer, props.innerContainer]}>
                    <Text style={styles.txt}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton
