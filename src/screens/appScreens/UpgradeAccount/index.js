import React, { useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StatusBar, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import AppHeader from 'src/components/AppHeader'
import { Images, Colors, Strings } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import CustomButton from 'src/components/CustomButton';
import ContactTextInput from 'src/components/ContactTextInput'

export default function UpgradeAccount() {
    const navigation = useNavigation()
    const [montlyFlag, setMonthlyFlag] = useState(false)
    const [yearlyFlag, setYearlyFlag] = useState(false)
    const [smsFlag, setSmsFlag] = useState(false)
    const [mobile, setMobile] = useState('')

    const handleMonth = () => {
        setMonthlyFlag(true)
        setYearlyFlag(false)
    }
    const handleYear = () => {
        setMonthlyFlag(false)
        setYearlyFlag(true)
    }

    return (
        <ImageBackground source={Images.Background2}
            resizeMode="cover"
            style={styles.container}>
            <StatusBar backgroundColor={Colors.mediumBlue} />
            <AppHeader
                centerImage={Images.Logo}
            />
            <ScrollView style={styles.innerContainer}>
                <Text style={styles.upgradeTxt}>{Strings.upgradeAccount}</Text>
                <View style={styles.filterContainer}>
                    <Image source={Images.Filter} resizeMode={"contain"} style={styles.filterImage} />
                    <Text style={styles.filterTxt}>{Strings.filterFvrt}</Text>
                </View>
                <Text style={styles.choosePlanTxt}>{Strings.choosePlan}</Text>
                <View style={styles.planContainer}>
                    <TouchableOpacity
                        onPress={() => handleMonth()}
                        activeOpacity={0.8}
                        style={[styles.planInnerLeftContainer, { borderColor: montlyFlag ? Colors.darkOrange : Colors.mediumBlue }]}>
                        {montlyFlag ?
                            <Image source={Images.FilledTick} style={styles.checkBox} />
                            :
                            <View style={styles.uncheckBox}></View>
                        }
                        <Text style={styles.priceTxt}>$0.99/month</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleYear()}
                        activeOpacity={0.8}
                        style={[styles.planInnerRightContainer, { borderColor: yearlyFlag ? Colors.darkOrange : Colors.mediumBlue }]}>
                        {yearlyFlag ?
                            <Image source={Images.FilledTick} style={styles.checkBox} />
                            :
                            <View style={styles.uncheckBox}></View>
                        }
                        <Text style={styles.priceTxt}>$10/year</Text>
                    </TouchableOpacity>
                </View>
                {yearlyFlag || montlyFlag ?
                    <View style={{ marginHorizontal: 20 }}>
                        <ContactTextInput
                            leftImage={Images.Mobile}
                            placeholderTextColor={Colors.white}
                            placeholder={"Mobile Number"}
                            multiline={false}
                            value={mobile}
                            maxLength={20}
                            onChangeText={(txt) => setMobile(txt)}
                            keyboardType={"phone-pad"}
                            autoCapitalize="none"
                            returnKeyType={"done"}

                        />
                        <TouchableOpacity
                            onPress={() => setSmsFlag(!smsFlag)}
                            activeOpacity={0.8}
                            style={styles.smsContainer}>
                            {smsFlag ?
                                <Image source={Images.FilledTick} style={styles.checkBox} />
                                :
                                <View style={styles.uncheckBox}></View>
                            }
                            <Text style={styles.priceTxt}>SMS opt in here</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
                <View style={styles.btnContainer}>
                    <CustomButton
                        title={"Upgrade"}
                        onpress={() => navigation.navigate("withoutBottomtab", { screen: "Payment" })} />
                    <CustomButton
                        title={"No Thanks"}
                        Contianer={styles.blackBtnContainer}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    );
}
