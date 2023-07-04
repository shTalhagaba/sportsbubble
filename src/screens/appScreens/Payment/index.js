import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StatusBar, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import AppHeader from 'src/components/AppHeader'
import { Images, Colors, Strings } from 'src/utils';
import { useNavigation } from '@react-navigation/native';
import CustomButton from 'src/components/CustomButton';
import ContactTextInput from 'src/components/ContactTextInput'

const data = [
    { id: 1, name: "Credit", selected: false },
    { id: 2, name: "Debit", selected: false },
    { id: 3, name: "Other Option", selected: false },
]

export default function Payment() {
    const navigation = useNavigation()

    const [paymentData, setPaymentData] = useState(data)
    const [cardNumber, setCardNumber] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [country, setCountry] = useState('')
    const [zip, setZip] = useState('')
    const [saveCardFlag, setSaveCardFlag] = useState(false)

    const cardNumberRef = useRef()
    const expiryDateRef = useRef()
    const cvvRef = useRef()

    const handleSelectPayment = (item, index) => {
        let list = [...paymentData]
        list.map((element) => {
            element.selected = false
        })
        list[index].selected = !list[index].selected
        setPaymentData(list)
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
                <Text style={styles.checkoutTxt}>{Strings.checkout}</Text>
                <View style={styles.payContainer}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.appleContainer}>
                        <Image source={Images.ApplePay} resizeMode={"contain"} style={styles.payIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} style={styles.googleContainer}>
                        <Image source={Images.GooglePay} resizeMode={"contain"} style={styles.payIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.payusingContainer}>
                    <View style={styles.line}></View>
                    <Text style={styles.payusingTxt}>{Strings.payusing}</Text>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.paymentList}>
                    <FlatList
                        data={paymentData}
                        horizontal
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => handleSelectPayment(item, index)}
                                activeOpacity={0.8}
                                style={[styles.payListContainer, { borderColor: item?.selected ? Colors.darkOrange : Colors.mediumBlue }]}>
                                {item?.selected ?
                                    <Image source={Images.FilledTick} style={styles.checkBox} />
                                    :
                                    <View style={styles.uncheckBox}></View>
                                }
                                <Text style={styles.payTxt}>{item?.name}</Text>
                            </TouchableOpacity>
                        )} />
                </View>
                <Text style={styles.cardInformationTxt}>{Strings.cardInformation}</Text>
                <ContactTextInput
                    leftImage={Images.Card}
                    refInner={cardNumberRef}
                    placeholderTextColor={Colors.white}
                    placeholder={"Password"}
                    multiline={false}
                    value={cardNumber}
                    maxLength={16}
                    onChangeText={(txt) => setCardNumber(txt)}
                    keyboardType={"number-pad"}
                    autoCapitalize="none"
                    returnKeyType={"next"}
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                        expiryDateRef.current.focus();
                    }}

                />
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.expiryContainer}>
                        <ContactTextInput
                            leftImage={Images.Card}
                            refInner={expiryDateRef}
                            placeholderTextColor={Colors.white}
                            placeholder={"MM/YY"}
                            multiline={false}
                            value={expiryDate}
                            maxLength={4}
                            onChangeText={(txt) => setExpiryDate(txt)}
                            keyboardType={"number-pad"}
                            autoCapitalize="none"
                            returnKeyType={"next"}
                            blurOnSubmit={false}
                            onSubmitEditing={() => {
                                cvvRef.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.cvvContainer}>
                        <ContactTextInput
                            leftImage={Images.Card}
                            refInner={cvvRef}
                            placeholderTextColor={Colors.white}
                            placeholder={"CVV"}
                            multiline={false}
                            value={cvv}
                            maxLength={3}
                            onChangeText={(txt) => setCvv(txt)}
                            keyboardType={"number-pad"}
                            autoCapitalize="none"
                            returnKeyType={"done"}
                            blurOnSubmit={false}
                            secureTextEntry={true}

                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => setSaveCardFlag(!saveCardFlag)}
                    activeOpacity={0.8}
                    style={styles.saveCardContainer}>
                    {saveCardFlag ?
                        <Image source={Images.FilledTick} style={styles.checkBox} />
                        :
                        <View style={styles.uncheckBox}></View>
                    }
                    <Text style={styles.saveCardTxt}>{Strings.savethisCard}</Text>
                </TouchableOpacity>
                <Text style={[styles.cardInformationTxt, { marginTop: 0 }]}>{Strings.countryRegion}</Text>

                <ContactTextInput
                    leftImage={Images.Country}
                    placeholderTextColor={Colors.white}
                    placeholder={"United States"}
                    multiline={false}
                    value={country}
                    maxLength={50}
                    onChangeText={(txt) => setCountry(txt)}
                    keyboardType={"default"}
                    autoCapitalize="none"
                    returnKeyType={"next"}
                />
                <ContactTextInput
                    leftImage={Images.Location}
                    placeholderTextColor={Colors.white}
                    placeholder={"Zip"}
                    multiline={false}
                    value={zip}
                    maxLength={50}
                    onChangeText={(txt) => setZip(txt)}
                    keyboardType={"default"}
                    autoCapitalize="none"
                    returnKeyType={"next"}
                />

                <View style={styles.btnContainer}>
                    <CustomButton
                        title={"Upgrade"}
                        onpress={() => navigation.navigate("withoutBottomtab", { screen: "Payment" })} />

                </View>

            </ScrollView>

        </ImageBackground>
    );
}
