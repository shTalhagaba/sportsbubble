import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import styles from './styles';
import ContactTextInput from 'src/components/ContactTextInput'
import AppHeader from 'src/components/AppHeader'
import { Images, Colors, Fonts } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';


export default function Login() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [displayPassword, setDisplayPassword] = useState(true);


    const emailRef = useRef()
    const passwordRef = useRef()

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
                    <Text style={styles.loginTxt}>Login</Text>
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
                    />
                    <CustomButton 
                        blue={true}
                        title={"Sign In"} />
                    <TouchableOpacity onPress={()=>navigation.navigate("ForgotPassword")}>
                    <Text style={styles.forgotTxt}>Forgot Password?</Text> 
                    </TouchableOpacity>

                    <Text style={styles.accountTxt}>Don't have an account?</Text> 
                    <TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
                    <Text style={styles.signupTxt}>Sign Up</Text> 
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </ImageBackground>
    );
}
