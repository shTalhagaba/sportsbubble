import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput'
import AppHeader from 'src/components/AppHeader'
import { Images, Colors, Fonts } from 'src/utils';
import CustomButton from 'src/components/CustomButton';


export default function Signup() {
    const [fullName, setFullName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [displayPassword, setDisplayPassword] = useState(true);
    const [displayConfirmPassword, setDisplayConfirmPassword] = useState(true);


    const fullNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    return (
        <ImageBackground source={Images.Background}
            resizeMode="cover"
            style={styles.container}>
            <AppHeader
                centerImage={Images.Logo}
                LeftImage={Images.LeftIcon}
                customLeftImage={{ tintColor: Colors.yellow }}
                SimpleView />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.signupTxt}>Sign Up</Text>
                    <ContactTextInput
                        leftImage={Images.UserIcon}
                        refInner={fullNameRef}
                        Contianer={{ marginTop: 40 }}
                        placeholderTextColor={Colors.white}
                        placeholder={"Full Name"}
                        multiline={false}
                        value={fullName}
                        maxLength={50}
                        onChangeText={(txt) => setFullName(txt)}
                        keyboardType={"default"}
                        autoCapitalize="none"
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            lastNameRef.current.focus();
                        }}
                    />
                    <ContactTextInput ddddddddd
                        leftImage={Images.UserIcon}
                        refInner={lastNameRef}
                        placeholderTextColor={Colors.white}
                        placeholder={"Last Name"}
                        multiline={false}
                        value={lastName}
                        maxLength={50}
                        onChangeText={(txt) => setLastName(txt)}
                        keyboardType={"default"}
                        autoCapitalize="none"
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            emailRef.current.focus();
                        }}
                    />
                    <ContactTextInput
                        leftImage={Images.EmailIcon}
                        refInner={emailRef}
                        placeholderTextColor={Colors.white}
                        placeholder={"Email"}
                        multiline={false}
                        value={email}
                        maxLength={50}
                        onChangeText={(txt) => setEmail(txt)}
                        keyboardType={"email-address"}
                        autoCapitalize="none"
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            passwordRef.current.focus();
                        }}
                    />
                    <ContactTextInput
                        leftImage={Images.LockIcon}
                        refInner={passwordRef}
                        placeholderTextColor={Colors.white}
                        placeholder={"Password"}
                        multiline={false}
                        value={password}
                        maxLength={50}
                        onChangeText={(txt) => setPassword(txt)}
                        keyboardType={"default"}
                        autoCapitalize="none"
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        secureText
                        secureTextEntry={displayPassword}
                        eyeOpen={displayPassword}
                        onPress={() => setDisplayPassword(!displayPassword)}
                        onSubmitEditing={() => {
                            confirmPasswordRef.current.focus();
                        }}
                    />
                    <ContactTextInput
                        leftImage={Images.LockIcon}
                        refInner={confirmPasswordRef}
                        placeholderTextColor={Colors.white}
                        placeholder={"Confrim Password"}
                        multiline={false}
                        value={confirmPassword}
                        maxLength={50}
                        onChangeText={(txt) => setConfirmPassword(txt)}
                        keyboardType={"default"}
                        autoCapitalize="none"
                        returnKeyType={"done"}
                        secureText
                        secureTextEntry={displayConfirmPassword}
                        eyeOpen={displayConfirmPassword}
                        onPress={() => setDisplayConfirmPassword(!displayConfirmPassword)}
                    />
                    <CustomButton  
                        title={"Continue"} />
                  
                </View>

            </ScrollView>
        </ImageBackground>
    );
}
