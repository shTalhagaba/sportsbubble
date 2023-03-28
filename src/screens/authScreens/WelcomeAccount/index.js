import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput'
import AppHeader from 'src/components/AppHeader'
import { Images, Colors, Fonts } from 'src/utils';
import CustomButton from 'src/components/CustomButton';


export default function WelcomeAccount() {
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
        <ImageBackground source={Images.Background2}
            resizeMode="cover"
            style={styles.container}>
            <AppHeader
                centerImage={Images.Logo}
                LeftImage={Images.LeftIcon}
                customLeftImage={{ tintColor: Colors.yellow }}
                SimpleView />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.signupTxt}>Welcome, FirstName!</Text>
                    <Text style={styles.accountTxt}>We just need a few more details to configure your account</Text> 
                    <ContactTextInput
                        leftImage={Images.UserIcon}
                        refInner={fullNameRef}
                        Contianer={{ marginTop: 40 }}
                        placeholderTextColor={Colors.white}
                        placeholder={"Zip Code"}
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
                    <Text style={styles.sideTxt}>Sharing your location allows us to surface the most relevant event listings in your area</Text> 
                    <ContactTextInput
                        leftImage={Images.LockIcon}
                        refInner={passwordRef}
                        placeholderTextColor={Colors.white}
                        placeholder={"Birthdate"}
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
                    <Text style={styles.sideTxt}>You must be at least 14 years of age of register.</Text> 
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
                     <Text style={styles.sideTxt}>Wording for this tk</Text> 
                    <View style={{marginTop: 55}}>
                    <CustomButton  
                        title={"Continue"} />
                    </View>
                  
                </View>

            </ScrollView>
        </ImageBackground>
    );
}
