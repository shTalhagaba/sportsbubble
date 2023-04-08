import React from 'react'
import { View, TextInput, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Images, Colors } from 'src/utils';



const ContactTextInput = (props) => {
    return (
        <View style={[styles.container, props.Contianer]}>
            <View style={[styles.innerContainer, props.innerContainer]}>
                <Image source={props.leftImage} style={styles.leftIcon} />
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
                    <TouchableOpacity onPress={props.onPress} style={styles.iconContainer}>
                        <Image source={props.eyeOpen ? Images.EyeOpen : Images.EyeClose} style={styles.eyeIcon} resizeMode={"contain"} />
                    </TouchableOpacity>
                )}
                {/*{props.rightImage && (
                    <TouchableOpacity onPress={props.pressRightImage}>
                        <Image source={props.rightImage} style={[styles.eyeIcon, props.iconStyle]} resizeMode={"contain"} />
                    </TouchableOpacity>
                )} */}
            </View>

        </View>


    )

}

export default ContactTextInput
