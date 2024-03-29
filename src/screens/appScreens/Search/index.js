import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ImageBackground, View, Image, Text, StatusBar, TouchableOpacity, Keyboard, TextInput, Platform, SafeAreaView } from 'react-native';
import styles from './styles';
import { Images, Colors, Constants, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import dayjs from 'dayjs';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import ImageWithPlaceHolder from 'src/components/ImageWithPlaceHolder';
import strings from 'src/utils/strings';
import { setSearchFlag } from 'src/store/types';

export default function Search() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let isFocused = useIsFocused()
  const reduxData = useSelector(state => state.user);
  const currentDate = dayjs(new Date()).toISOString(); // Get the current date and time
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [isFocusedFlag, setIsFocusedFlag] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const inputRef = useRef(null);
  const [masterData, setMasterData] = useState(reduxData.eventList);

  useEffect(() => {
    setMasterData(reduxData?.eventList)
    setList(reduxData?.eventList)
  }, [])

  useEffect(() => {
    if (isFocused) {
      dispatch(setSearchFlag(true))
      handleFocus()
      inputRef?.current?.focus();
      // Keyboard.dismiss();
    }
    return () => {
      Keyboard.dismiss();
      setIsFocusedFlag(false)
      dispatch(setSearchFlag(null))
      // setSearchText('')
    }
  }, [isFocused]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);



  const keyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };
  const keyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };
  const handleFocus = () => {
    setIsFocusedFlag(true);
  };
  const handleDone = () => {
    setIsFocusedFlag(false);
  };
  const handleClear = () => {
    setSearchText('');
    // setIsFocusedFlag(false);
    // Keyboard.dismiss();
  };

  useEffect(() => {
    if (searchText?.length > 0) {
      handleInputChange(searchText)
    }
  }, [reduxData.eventList])

  const handleInputChange = (text) => {
    if (text) {
      var tempArr = [...reduxData.eventList];
      var filterArr = tempArr.filter((item) => {
        const itemData =
          (item?.line1.toLowerCase().includes(text.toLowerCase()) ||
            item?.line2.toLowerCase().includes(text.toLowerCase()) ||
            item?.category?.name.toLowerCase().includes(text.toLowerCase()) ||
            item?.sport?.name.toLowerCase().includes(text.toLowerCase())) &&
          dayjs(currentDate).isBefore(item?.endTime);
        return itemData;
      });
      setList(filterArr);
      setSearchText(text);
    } else {
      setList(masterData);
      setSearchText(text);
    }
  };


  const handleEnd = () => {
    if (isKeyboardOpen) {
      Keyboard.dismiss()
    } else {
      inputRef?.current?.focus()
    }
  }

  const hasRightHolders = (rightHolders) => {
    return (
      rightHolders?.edges?.filter((edge) => edge?.node?.weight > 1000).length >
      0
    )
  }
  const handleDetails = (item) => {
    if (item &&
      item?.rightsHoldersConnection &&
      item?.rightsHoldersConnection?.totalCount === 1 &&
      dayjs(currentDate).isAfter(item?.startTime) &&
      dayjs(currentDate).isBefore(item?.endTime) &&
      hasRightHolders(item?.rightsHoldersConnection)
    ) {
      Keyboard.dismiss();
      navigation.navigate('withoutBottomtab', {
        screen: 'Connect',
        params: {
          item: item,
          holderItem: item?.rightsHoldersConnection,
          eventFlag: true,
        },
      });
    } else {
      Keyboard.dismiss();
      setTimeout(() => {
        navigation.navigate('SearchWatch', {
          item: item,
          searchFlag: true,
        });
      }, isKeyboardOpen ? 500 : 0)
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.Background2}
        resizeMode="cover"
        style={styles.container}>
        <StatusBar
          backgroundColor={Colors.transparent}
          translucent
          barStyle="light-content"
        />
        {/* Header with Logo and back icon  */}
        <AppHeader
          centerImage={Images.Logo}
          LeftImage={Images.LeftIcon}
          onPressBack={() => {
            handleClear()
            navigation.navigate('Guide', {
              screen: 'GuideMain',
            })
          }
          }
          SimpleView
        />
        <SafeAreaView style={styles.mainContainer}>
          {/* Search text box */}
          <TouchableOpacity
            onPress={() => inputRef.current?.focus()} // Focus the input when the TouchableOpacity is pressed
            style={[
              styles.searchContainer,
              isKeyboardOpen ? styles.focus : styles.blur,
            ]}>
            <View style={styles.searchMainContainer}>
              {isFocusedFlag && (
                <View
                  style={styles.searchInnerContainer}>
                  <Image
                    source={Images.Search}
                    style={styles.searchImageTwo}
                    resizeMode={'contain'}
                  />
                  <Text style={styles.searchTxt}>{strings.search}</Text>
                </View>
              )}
              <View
                style={styles.searchFocusContainer}>
                {!isFocusedFlag && (
                  <Image
                    source={Images.Search}
                    style={styles.searchImage}
                    resizeMode={'contain'}
                  />
                )}
                <TextInput
                  ref={inputRef}
                  style={styles.inputField}
                  onFocus={handleFocus}
                  autoFocus={true}
                  placeholder={!isFocusedFlag ? 'Search' : ''}
                  placeholderTextColor={Colors.white}
                  value={searchText}
                  onChangeText={handleInputChange}
                  onSubmitEditing={handleDone}
                  returnKeyType='search'
                  onEndEditing={() => handleEnd()}
                />
              </View>
            </View>
            <TouchableOpacity onPress={handleClear} style={styles.clearContainer}>
              <Image
                source={Images.Cross}
                style={styles.crossImage}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* list showing after search */}
          <FlatList
            data={searchText.length > 0 ? list : []}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            onScrollBeginDrag={() => Keyboard.dismiss()}
            ListEmptyComponent={
              <View>
                <Text style={styles.emptyTxt}>
                  {searchText.length > 0 && list && list.length <= 0
                    ? Strings.emptyEventsSearchList
                    : Strings.emptySearchList}
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listContainer}
                onPress={() => handleDetails(item)}>
                <View style={styles.innerContainer}>
                  <View style={styles.imageContainer}>
                    <ImageWithPlaceHolder
                      source={item?.logo1}
                      placeholderSource={Constants.placeholder_trophy_icon}
                      style={styles.imageIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.userNameContainer}>
                    <Text style={styles.eventTxt}>
                      {item?.line1 ? item?.line1 : item?.companyName}
                    </Text>
                    <Text style={styles.titleTxt} numberOfLines={1}>
                      {item?.line2 ? item?.line2 : item?.title}
                    </Text>
                    <View style={styles.innerContainer}>
                      <Text style={styles.eventTxt}>
                        {' ' + item?.startTime
                          ? dayjs(item?.startTime).format('ddd. MM/D')
                          : item?.day}
                        {'  l '}
                      </Text>
                      <Text style={styles.eventTxt}>
                        {' '}
                        {' ' + item?.startTime
                          ? dayjs(item?.startTime).format('h:mma') +
                          ' - ' +
                          dayjs(item?.endTime).format('h:mma')
                          : item?.time}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()} // Change to a unique key if available
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}