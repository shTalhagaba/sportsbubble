import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Platform,
} from 'react-native';
import styles from './styles';
import { Images, Colors, Constants, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ImageWithPlaceHolder from 'src/components/ImageWithPlaceHolder';
import strings from 'src/utils/strings';

export default function Search(props) {
  const navigation = useNavigation();
  const reduxData = useSelector(state => state.user);
  const currentDate = dayjs(new Date()).toISOString(); // Get the current date and time
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [isFocused, setIsFocused] = useState(true);
  const [searchFlag, setSearchFlag] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const inputRef = useRef(null);

  const handleInputChange = text => {
    setSearchText(text);
    if (
      text &&
      text.length > 0 &&
      reduxData &&
      reduxData.eventList &&
      reduxData.eventList.length > 0
    ) {
      const filtered = reduxData.eventList.filter(item => {
        for (const key in item) {
          const value = item[key];
          if (
            value !== null &&
            typeof value === 'string' &&
            value.toLowerCase().includes(text.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
      setList(filtered);
    }
  };

  const handleDone = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    onPressTouch();
  }, [isFocused]);

  const focusSearch = async () => {
    await setIsFocused(true)
    await onPressTouch();
  }

  const onPressTouch = () => {
    if (!isFocused) {
      setTimeout(() => {
        inputRef?.current?.focus();
        // setIsFocused(false)

        Keyboard.dismiss();
      }, 100); // Delay the focus call to ensure proper rendering
    }
  };

  const handleClear = () => {
    setSearchText('');
    setIsFocused(false);
    setSearchFlag(false);
  };

  return (
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
        onPressBack={() =>
          navigation.navigate('Search', {
            screen: 'Guide',
          })
        }
        SimpleView
      />
      <View style={styles.mainContainer}>
        {/* Search text box */}
        <TouchableOpacity
          onPress={() => focusSearch()}
          style={[
            styles.searchContainer,
            isFocused ? styles.focus : styles.blur,
          ]}>
          <View style={{ flex: 1 }}>
            {isFocused && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: Platform.OS === 'ios' ? -5 : 5,
                  marginLeft: 15,
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.Search}
                  style={styles.searchImageTwo}
                  resizeMode={'contain'}
                />
                <Text style={styles.searchTxt}>{strings.search}</Text>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                marginLeft: 12,
              }}>
              {!isFocused && (
                <Image
                  source={Images.Search}
                  style={styles.searchImage}
                  resizeMode={'contain'}
                />
              )}
              <TextInput
                style={styles.inputField}
                onFocus={handleFocus}
                autoFocus={true}
                placeholder={!isFocused ? 'Search' : ''}
                placeholderTextColor={Colors.white}
                value={searchText}
                onChangeText={handleInputChange}
                onSubmitEditing={handleDone}
                returnKeyType='search'
                onEndEditing={() => console.log('edit')}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleClear}>
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
              onPress={() => {
                if (
                  item &&
                  item?.rightsHoldersConnection &&
                  item?.rightsHoldersConnection?.totalCount === 1 &&
                  dayjs(currentDate).isAfter(item?.startTime) &&
                  dayjs(currentDate).isBefore(item?.endTime)
                ) {
                  navigation.navigate('withoutBottomtab', {
                    screen: 'Connect',
                    params: {
                      item: item,
                      holderItem: item?.rightsHoldersConnection,
                      eventFlag: true,
                    },
                  });
                } else {
                  navigation.navigate('Watch', {
                    item: item,
                    searchFlag: true,
                  });
                }
              }}>
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
      </View>
    </ImageBackground>
  );
}