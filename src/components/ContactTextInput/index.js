import React from 'react'
import { View, TextInput, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import EyeOpen from 'src/assets/images/EyeOpen';
import { Colors } from 'src/utils';

const ContactTextInput = (props) => {
    return (
        <View style={[styles.container, props.Container]}>
            <View style={[styles.innerContainer, props.innerContainer]}>
                <Image source={props.leftImage} style={styles.leftIcon} resizeMode={"contain"} />
                <TextInput
                    {...props}
                    style={[styles.inputField, props.customInputStyle]}
                    placeholder={props.placeholder}
                    placeholderTextColor={props.placeholderTextColor}
                    multiline={props.multiline}
                    value={props.value}
                    underlineColorAndroid="transparent"
                    editable={props.editable}
                    secureTextEntry={props.secureTextEntry}
                    onChangeText={props.onChangeText}
                    keyboardType={props.keyboardType}
                    textAlignVertical={props.textAlignVertical}
                    maxLength={props.maxLength}
                    autoCapitalize={props.autoCapitalize}
                    returnKeyType={props.returnKeyType}
                    onSubmitEditing={props.onSubmitEditing}
                    blurOnSubmit={props.blurOnSubmit}
                    ref={props.refInner}
                    numberOfLines={props.numberOfLines}
                />
                {props.secureText && (
                    <TouchableOpacity onPress={props.onPress} style={styles.iconEyeContainer}>
                        <EyeOpen width={14} height={14} color={props.eyeOpen ?  Colors.white : Colors.white70 } />
                    </TouchableOpacity>
                )}
                {props.rightImage && (
                    <TouchableOpacity onPress={props.pressRightImage} style={styles.iconContainer}>
                        <Image source={props.rightImage} style={[styles.eyeIcon, props.iconStyle]} resizeMode={"contain"} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default ContactTextInput
