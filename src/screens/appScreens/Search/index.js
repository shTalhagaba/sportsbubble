import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  View,
  Image,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Platform,
} from 'react-native';
import styles from './styles';
import {Images, Colors, Constants, Strings} from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import AppSearch from 'src/components/AppSearch';
import {useQuery} from '@apollo/client';
import {SEARCH_EVENTS_QUERY} from './queries';
import dayjs from 'dayjs';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImageWithPlaceHolder from 'src/components/ImageWithPlaceHolder';
const expireTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function Search(props) {
  const navigation = useNavigation();
  const textInputRef = useRef();
  const reduxData = useSelector(state => state.user);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [startTime, setStartTime] = useState(dayjs(new Date()).toISOString());
  const [endTime, setEndTime] = useState(
    dayjs(new Date()).add(7, 'day').toISOString(),
  );
  const [isFocused, setIsFocused] = useState(true);
  const [searchFlag, setSearchFlag] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // useEffect(() => {
  //   if (textInputRef.current) {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       textInputRef.current?.focus();
  //     });
  //     return unsubscribe;
  //   }
  // }, [textInputRef.current]);

  const inputRef = useRef(null);

  // useEffect(() => {
  //   inputRef?.current?.focus();
  //   Keyboard.dismiss(); // Open the keyboard immediately after focusing

  //   // Optionally, you can add a delay before opening the keyboard
  //   // setTimeout(() => {
  //   //   Keyboard.dismiss();
  //   // }, 2000);
  // }, [inputRef, navigation]);

  useEffect(() => {
    const currentTime = Date.now();
    if (
      (reduxData && reduxData?.expire === currentTime) ||
      (reduxData && reduxData?.eventList && reduxData?.eventList.length <= 0)
    ) {
      const {loading, refetch, error, data} = useQuery(SEARCH_EVENTS_QUERY, {
        variables: {
          searchString: searchText,
          startTime: startTime,
          endTime: endTime,
        },
        onCompleted: data => {
          if (data && data?.sortedEvents.length > 0) {
            dispatch(setStoreEventList(data?.sortedEvents));
            dispatch(setExpire(expireTime));
          }
        },
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,

        onError: error => {
          console.log('error : ', error);
        },
      });
    }
  }, [navigation]);

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
      console.log('filtered: ', filtered);
      setList(filtered);
    }
  };
  const handleDone = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    onPressTouch();
  }, [isFocused]);
  const onPressTouch = () => {
    if(!isFocused){
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
    setSearchFlag(false)
  };


  // const onPressTouch = () => {

  //   inputRef?.current?.focus();
  //   Keyboard.dismiss(); // Open the keyboard immediately after focusing
  // }
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
      {/* <KeyboardAwareScrollView enableAutomaticScroll={true}> */}
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        SimpleView
      />
      <View style={styles.mainContainer}>
        {/* Search text box */}
        <TouchableOpacity
          onPress={() => setIsFocused(true)}
          style={[
            styles.searchContainer,
            isFocused ? styles.focus : styles.blur,
          ]}>
          <View style={{flex: 1}}>
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
                <Text style={styles.searchTxt}>Search</Text>
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
                style={[styles.inputField]}
                onFocus={handleFocus}
                // onBlur={handleBlur} // Uncomment this line if needed
                autoFocus={true}
                placeholder={!isFocused ? 'Search' : ''}
                placeholderTextColor={Colors.white}
                value={searchText}
                onChangeText={text => handleInputChange(text)}
                onSubmitEditing={handleDone}
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

        {/* <AppSearch
            searchImage={Images.Search}
            placeHolderColor={Colors.white}
            placeHolder={'Search...'}
            closeImage={Images.Cross}
            refInner={inputRef}
            // ref={inputRef}
            // refInner={textInputRef}
            onPressCloseImage={() => setSearchText('')}
            value={searchText}
            onChangeText={text => handleInputChange(text)}
            autoFocus={true}
          /> */}
        {/* list showing after search */}
        <FlatList
          data={searchText.length > 0 ? list : []}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View>
              <Text style={styles.emptyTxt}>
                {Strings.emptySearchList}
              </Text>
            </View>
          }
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.listContiner}
              onPress={() => {
                if (
                  item &&
                  item?.rightsHoldersConnection &&
                  item?.rightsHoldersConnection?.totalCount === 1
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
          keyExtractor={(item, index) => item?.id}
        />
        {/* ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator color={'#fff'} size={'large'} />
          </View>
        )} */}
      </View>
      {/* </KeyboardAwareScrollView> */}
    </ImageBackground>
  );
}
