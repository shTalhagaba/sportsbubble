import React, { useEffect, useState, useCallback } from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import styles from './styles';
import { Images, Colors, Strings, Constants } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import LiveMatchView from 'src/components/Modal/LiveMatchModal';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { GET_SORTED_EVENTS } from './queries';
import { useDispatch, useSelector } from 'react-redux';
import { refreshData, selectedTimebar, setStoreEventList } from 'src/store/types';
import { moderateScale } from 'react-native-size-matters';
import ImageWithPlaceHolder from 'src/components/ImageWithPlaceHolder';
import Config from 'react-native-config';
import GestureRecognizer from 'react-native-swipe-gestures';
import { UpdateEvents } from 'src/utils/functions';

const screenWidth = Dimensions.get('window').width;
const { fontScale } = Dimensions.get('window');

// Sample data for the category slider
const categoryArr = [
  {
    id: 1,
    title: 'all',
    value: 'all',
    selected: true,
  },
  {
    id: 2,
    title: 'pro',
    value: 'pro',
  },
  {
    id: 3,
    title: 'college',
    value: 'college',
  },
  {
    id: 4,
    title: 'esports',
    value: 'e-sports',
  },
];

export default function Guide(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let isFocused = useIsFocused()
  const currentDate = dayjs(new Date()).toISOString(); // Get the current date and time
  const reduxData = useSelector(state => state.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [liveMatchModal, setLiveMatchModal] = useState(false);
  const [timeData, setTimeData] = useState([]);
  const [categoryData, setCategoryData] = useState(categoryArr);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const stageToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJodHRwczovL2Rldi0zNTM5MjYyLm9rdGEuY29tL29hdXRoMi92MS90b2tlbiIsImlzcyI6IjBvYTlrN2RpYWRqOUxJN0tkNWQ2Iiwic3ViIjoiMG9hOWs3ZGlhZGo5TEk3S2Q1ZDYifQ.sJCxcymR_X_OtWCZxJ5_AfUbWvKkd1ML8JW-Wl91xV8uJ2paw067kEgfR7QYz6dk3-1-egBjyf1Mifm1cTN1S8JPpkd1NN1Aw6uuky3lt5jmjeHwwqL-XHzIkSjLN_t8zdO5OpDqtlbEqyNGtJFCONJ9K-hCjp7u5FWCZ1nKwIK3X1w-FVjRDLbvJrTrh8IJriqPhiWHfkGbz-jm6yStYXMw3uhcKd164RA2l8utz4jnVRn9ebcOiN_BQb3yvtqBc0CsxB6YKQmmW7Rbpg8cRU3B1zfLfMMu2QVPLYr5vDD2mhK1PwixUZ6UnYrYirXWNNTqyZquGZPQWpIlY9sIwA'

  const [eventList, setEventList] = useState(
    reduxData &&
      reduxData?.eventList &&
      reduxData?.eventList.length > 0
      ? reduxData?.eventList
      : [],
  );
  const [filteredEventList, setFilteredEventList] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [startSearchTime, setStartSearchTime] = useState(
    dayjs(new Date()).toISOString(),
  );
  const [endSearchTime, setEndSearchTime] = useState(
    dayjs(new Date()).add(7, 'day').toISOString(),
  );

  // Use useEffect to call fetchData every 5 minutes
  useEffect(() => {
    searchRefetch();
    const interval = setInterval(searchRefetch, 300000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  useEffect(() => {
    if (reduxData?.eventList && reduxData.eventList.length > 0) {
      setEventList(UpdateEvents(reduxData.eventList, startTime, new Date().toISOString()));
    }
  }, [reduxData?.eventList]);

  const { loading: searchLoading, refetch: searchRefetch, error: searchError } = useQuery(GET_SORTED_EVENTS, {
    variables: {
      startTime: startSearchTime,
      endTime: endSearchTime,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    context: {
      headers: {
        authorization:
          Platform.OS === "android" ? `Bearer ${stageToken}` :
            Config?.BEARER_TOKEN
              ? `Bearer ${Config.BEARER_TOKEN}`
              : '',
      },
    },
    onCompleted: data => {
      if (
        data &&
        data?.sortedEvents.length > 0
      ) {
        const filteredEvents = (data?.sortedEvents || []).filter(event => {
          const { line1, line2, startTime, endTime, rightsHolders, logo1, id, rightsHoldersConnection } = event;
          // Check if the event should be excluded based on id and rightsHoldersConnection
          if (
            id === '9f25117c-78ed-4af1-a2fb-ed5cef8ed414' ||
            !rightsHoldersConnection ||
            rightsHoldersConnection.edges.length < 1
          ) {
            return false;
          }
          // Check if all required properties exist
          if (
            !line1 ||
            !line2 ||
            !startTime ||
            !logo1 ||
            !endTime ||
            !rightsHolders
          ) {
            return false;
          }
          // Check if at least one rightsholder has a logoUrl
          const hasLogoUrl = rightsHolders.some(
            rightsholder => rightsholder.logoUrl,
          );
          if (!hasLogoUrl) {
            return false;
          }
          return true;
        });
        dispatch(setStoreEventList(filteredEvents));
        // setEventList(filteredEvents)
      }
    },
    onError: error => {
      console.log('error : ', error);
    },
  });

  const formatTime = (time) => {
    const hours = time.getHours()
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12
    return `${formattedHours} ${period}`
  }

  const getTimeList = () => {
    const hoursList = [];
    for (let i = 1; i < 169; i++) {
      const nextHour = new Date(new Date().getTime() + i * 60 * 60 * 1000)
      const roundedHour = new Date(
        nextHour.getFullYear(),
        nextHour.getMonth(),
        nextHour.getDate(),
        nextHour.getHours(),
        0,
        0
      )
      const timeObject = {
        id: i,
        title: formatTime(roundedHour),
        selected: false,
        datetime: roundedHour.toISOString(),
      }
      hoursList.push(timeObject)
    }
    const timeData = hoursList.flat();
    setTimeData(timeData);
    return timeData;
  };

  useEffect(() => {
    getTimeList();
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (reduxData?.refresh || reduxData?.selectedTimebar === -1) {
        handleLive()
        dispatch(refreshData(false)); // Dispatch the action
      } else {
        setSelectedTimeIndex(reduxData?.selectedTimebar)
      }
      searchRefetch()
      getTimeList();
    }
  }, [isFocused, reduxData?.refresh]);

  useEffect(() => {
    if (reduxData?.eventList && reduxData?.eventList.length > 0) {
      const filteredEvents = UpdateEvents(reduxData.eventList, startTime, new Date().toISOString())
      const list = filteredEvents.filter((event) => {
        const isCategoryMatch =
          selectedCategory.includes('all') ||
          selectedCategory.includes(event.category.name.toLowerCase());
        return isCategoryMatch;
      });
      setFilteredEventList(list);
    }
  }, [selectedCategory, startTime, reduxData?.eventList]);


  const handleSelectedCategory = (e, index) => {
    if (index === 0 && selectedCategory === 'all') {
      return;
    }
    let list = [...categoryData];
    const selectedTime = timeData?.[selectedTimeIndex]?.datetime;
    const formattedTime = dayjs(selectedTime).format(
      'YYYY-MM-DDTHH:mm:ss.SSSZ',
    );
    // Toggle the selected category
    list[index].selected = !list[index].selected;
    if (index === 0) {
      // Deselect all other categories if 'all' category is selected
      list.forEach((element, idx) => {
        if (idx !== 0) {
          element.selected = false;
        }
      });
    } else {
      // Check if all other categories are deselected
      const otherSelected = list.slice(1).some(element => element.selected);
      if (!otherSelected) {
        list[0].selected = true;
      } else {
        list[0].selected = false;
      }
    }

    // Filter events based on selected categories and time
    const selectedCategories = list.filter(category => category.selected);
    const selectedCategoryValues = selectedCategories.map(
      category => category.value,
    );

    let filteredEvents = [];
    if (
      selectedCategories.length === 1 &&
      selectedCategoryValues[0] === 'all'
    ) {
      setSelectedCategory('all');
      filteredEvents =
        selectedTimeIndex === 0
          ? eventList
          : eventList.filter(event =>
            dayjs(event.startTime).isAfter(formattedTime),
          );
    } else {
      filteredEvents =
        selectedTimeIndex === 0
          ? eventList.filter(event =>
            selectedCategoryValues.includes(
              event.category.name.toLowerCase(),
            ),
          )
          : eventList.filter(
            event =>
              selectedCategoryValues.includes(
                event.category.name.toLowerCase(),
              ) && dayjs(event.startTime).isAfter(formattedTime),
          );
      setSelectedCategory(selectedCategoryValues);
    }

    setCategoryData(list);
    setFilteredEventList(filteredEvents);
  };

  const handleSelectTime = (index, method) => {
    setStartTime(index === 0 ? new Date() : method == 'add' ? dayjs(new Date(startTime))
      .add(1, 'hours')
      .set('minutes', 0)
      .set('second', 0) : dayjs(new Date(startTime))
        .subtract(1, 'hours')
        .set('minutes', 0)
        .set('second', 0));
    const updatedTimeData = timeData.map((element, i) => ({
      ...element,
      selected: i === index,
    }));
    setTimeData(updatedTimeData);
    setSelectedTimeIndex(index);
  };

  // handle next timer to show next hour events
  const handleNext = () => {
    if (currentIndex < 166) {
      handleSelectTime(currentIndex + 1, 'add');
      setCurrentIndex(prevIndex => prevIndex + 1);
      setIsLive(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 1) {
      handleSelectTime(currentIndex - 1, 'subtract');
      setCurrentIndex(prevIndex => prevIndex - 1);
      setIsLive(false);
    } else {
      handleLive()
    }
  };

  const handleLive = () => {
    handleSelectTime(0);
    setCurrentIndex(0);
    setIsLive(true);
    dispatch(selectedTimebar(-1))
  };

  const ItemComponent = React.memo(({ item }) => {
    return (
      // Render your item component here
      // dayjs(item?.endTime).isAfter(currentDate) ? (
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() => {
          dispatch(selectedTimebar(selectedTimeIndex))
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
            navigation.navigate('Watch', { item: item });
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
          <View
            style={{
              width: `${item?.startGrad}%`,
              backgroundColor: Colors.darkBlue,
            }}></View>
          <View
            style={{
              // width: endTimeWidth(item?.endTime),
              backgroundColor: item?.live
                ? Colors.mediumGreen
                : Colors.mediumBlue,
              width: `${item?.endGrad + item.startGrad <= 86
                ? item?.endGrad - item?.startGrad
                : item?.endGrad + item?.startGrad >= 86
                  ? 86 - item?.startGrad
                  : item?.endGrad - item?.startGrad
                }%`,
            }}></View>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.darkBlue,
            }}></View>
          <View style={styles.userNameContainer}>
            <Text style={[styles.eventTxt]} numberOfLines={1}>
              {item?.line1 ? item?.line1 : item?.companyName}
            </Text>
            <Text style={styles.titleTxt} numberOfLines={1}>
              {item?.line2 ? item?.line2 : item?.title}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.eventDateTxt]}>
                {item?.startTime
                  ? dayjs(item?.startTime).format('ddd. MM/D')
                  : item?.day}
                {'  l '}
              </Text>
              <Text style={[styles.eventDateTxt]}>
                {' '}
                {item?.startTime
                  ? `${dayjs(item?.startTime).format('h:mma')} - ${dayjs(
                    item?.endTime,
                  ).format('h:mma')}`
                  : item?.time}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      // ) : null
    );
  });

  return (
    <View style={styles.container}>
    <ImageBackground
      source={Images.Background}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      {/* Header with Logo only  */}
      <AppHeader centerImage={Images.Logo} />
      {/* Slider all pro  */}
      <View style={styles.sliderContainer}>
        <FlatList
          horizontal
          data={categoryData}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            fontScale > 1
              ? { justifyContent: 'center' }
              : { justifyContent: 'center', flex: 1 }
          }
          scrollEnabled={fontScale > 1 ? true : false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleSelectedCategory(item, index)}
              style={styles.sliderInnerContainer}>
              <View
                style={[
                  styles.sliderInnerMainContainer,
                  { borderWidth: item?.selected ? moderateScale(2, 0.3) : 0 },
                ]}>
                {item?.selected && <View style={styles.rectangle2} />}
                <ImageBackground
                  source={
                    item?.selected
                      ? Images.ActiveSliderBack
                      : Images.InActiveSliderBorder
                  }
                  style={styles.sliderImageBackground}
                  imageStyle={
                    Platform.OS === 'android'
                      ? {
                        borderRadius: moderateScale(22, 0.3),
                        borderWidth: item?.selected
                          ? 0
                          : moderateScale(2.5, 0.3),
                        borderColor: Colors.darkBlue,
                      }
                      : {}
                  }
                  resizeMode={'stretch'}>
                  <Image
                    source={
                      index === 0
                        ? Images.Trophy
                        : index === 1
                          ? Images.Crown
                          : index === 2
                            ? Images.College
                            : Images.Game
                    }
                    style={styles.sliderIcon}
                    resizeMode={'contain'}
                  />
                  <Text numberOfLines={1}
                    style={[styles.sliderTxt, { maxWidth: Platform.OS === "android" ? fontScale > 1 ? "80%" : "100%" : "100%" }]}>
                    {item?.title.toUpperCase()}
                  </Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* time slider */}
      <GestureRecognizer
        onSwipeRight={state => {
          handlePrevious();
        }}
        onSwipeLeft={state => {
          handleNext();
        }}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 100,
          gestureIsClickThreshold: 20,
        }}>
        <View style={styles.timeSliderContainer}>
          {isLive ?
            <View style={styles.liveMainContainer}>
              <TouchableOpacity
                onPress={() => handleLive()}
                style={[
                  styles.liveTimeContainer,
                  {
                    backgroundColor: isLive
                      ? Colors?.mediumGreen
                      : Colors.mediumBlue,
                  },
                ]}>
                <Text
                  style={
                    isLive
                      ? styles.sliderActiveTimeTxt
                      : styles.sliderInactiveTimeTxt
                  }>
                  {'Live'}
                </Text>
              </TouchableOpacity>
            </View> :
            <View style={styles.leftIconStyle}>
              <TouchableOpacity
                onPress={() => handlePrevious()}
                style={[
                  styles.leftTimeContainer,
                  {
                    backgroundColor: Colors.brandBlue,
                  },
                ]}>
                <Image
                  source={Images.Arrow}
                  style={[styles.rightIcon, { transform: [{ rotate: '180deg' }] }]}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>}
          <View
            style={[styles.timeSliderInnerContainer, { width: screenWidth / 3 }]}>
            <FlatList
              horizontal
              data={timeData.slice(0, 2)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flex: 1, justifyContent: 'space-around' }}
              scrollEnabled={fontScale > 1.2 ? true : false}
              renderItem={({ item, index }) => {
                const adjustedIndex = index + currentIndex; // Calculate the adjusted index based on the current index
                return (
                  <View
                    style={[
                      styles.timeContainer,
                      {
                        backgroundColor: Colors.mediumBlue,
                      },
                    ]}>
                    <Text style={styles.sliderInactiveTimeTxt}>
                      {timeData[adjustedIndex]?.title}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.rightIconStyle}>
            <TouchableOpacity
              onPress={() => handleNext()}
              style={[
                styles.liveTimeContainer,
                {
                  backgroundColor:  Colors.brandBlue,
                }
              ]}>
              <Image
                source={Images.Arrow}
                style={styles.rightIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </GestureRecognizer>
      {/* main list  */}
      {false ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color={'#fff'} size={'large'} />
        </View>
      ) : (
        <ScrollView indicatorStyle={'white'}>
          <FlatList
            data={
              selectedCategory === 'all' && selectedTimeIndex >= 0
                ? filteredEventList && filteredEventList.length > 0
                  ? filteredEventList
                  : selectedTimeIndex > 0
                    ? filteredEventList
                    : []
                : filteredEventList
            }
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ItemComponent item={item} />}
            keyExtractor={item => item?.id}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={50} // Reduce initial render amount
            maxToRenderPerBatch={20} // Reduce number in each render batch
            updateCellsBatchingPeriod={20} // Increase time between renders
            windowSize={20} // Reduce the window size
            ListEmptyComponent={
              <View>
                <Text style={styles.emptyTxt}>{Strings.emptyGuideList}</Text>
              </View>
            }
          />
        </ScrollView>
      )}
      <LiveMatchView
        setLiveMatchModal={setLiveMatchModal}
        liveMatchModal={liveMatchModal}
      />
    </ImageBackground>
    </View>
  );
}
