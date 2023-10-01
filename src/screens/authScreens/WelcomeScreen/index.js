import React from 'react';
import { View, Text, Image, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Images, Colors } from 'src/utils';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation()
    return (
        <ImageBackground source={Images.HomeScreen}
            resizeMode="cover"
            style={styles.container}>
            <StatusBar backgroundColor={Colors.mediumBlue} />
            <View style={styles.innerContainer}>
                <Text style={styles.welcomeTxt}>Welcome to</Text>
                <Image source={Images.Logo} style={styles.logoImage} />
                <Text style={styles.liveSportTxt}>Live Sports Event Guide</Text>
                <Text style={styles.liveSportDesTxt}>Create an account for fast access to Pro, College, Olympic and Esports event information & viewing</Text>
                <View style={styles.btnContainer}>
                    <CustomButton
                        Contianer={styles.freeBtnContainer}
                        title={"Create Free Account"}
                        onpress={() => navigation.navigate("Signup")} />
                    <CustomButton
                        blue={true}
                        Contianer={styles.loginBtnContainer}
                        title={"Login"}
                        onpress={() => navigation.navigate("Login")} />
                    <TouchableOpacity onPress={() => console.log("Guest")}
                        style={styles.guestContainer}>
                        <Text style={styles.guestTxt}>Continue as Guest</Text>
                        <Image source={Images.RightArrow} style={styles.rightArrowImage} resizeMode={"contain"} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
