import React, { useEffect, useState } from 'react';
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
  ScrollView,
} from 'react-native';
import styles from './styles';
import { Images, Colors, Strings, Constants } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import LiveMatchView from 'src/components/Modal/LiveMatchModal';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { GET_SORTED_EVENTS } from './queries';
import { useDispatch, useSelector } from 'react-redux';
import { setExpire, setGuest, setStoreEventList, setUser } from 'src/store/types';
import { moderateScale } from 'react-native-size-matters';
import ImageWithPlaceHolder from 'src/components/ImageWithPlaceHolder';
import CustomMySportsModalView from 'src/components/Modal/CustomMySportsModalView';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
const screenWidth = Dimensions.get('window').width;
const { width, fontScale } = Dimensions.get('window');
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

const expireTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function Guide(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentDate = dayjs(); // Get the current date and time
  const reduxData = useSelector(state => state.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [liveMatchModal, setLiveMatchModal] = useState(false);
  const [timeData, setTimeData] = useState([]);
  const [categoryData, setCategoryData] = useState(categoryArr);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [mySportModal, setMySportModal] = useState(
    reduxData?.guest === true ? true : false,
  );
  const [eventList, setEventList] = useState(
    reduxData &&
      reduxData?.splashEventList &&
      reduxData?.splashEventList.length > 0
      ? reduxData?.splashEventList
      : [],
  );
  const [filteredEventList, setFilteredEventList] = useState([]);
  const [startTime, setStartTime] = useState(dayjs(new Date()).toISOString());
  const [startSearchTime, setStartSearchTime] = useState(
    dayjs(new Date()).toISOString(),
  );
  const [endSearchTime, setEndSearchTime] = useState(
    dayjs(new Date()).add(7, 'day').toISOString(),
  );
  const data = useSelector(state => state.user);

  // Fetch data from API using Apollo useQuery hook
  const { loading, refetch, error } = useQuery(GET_SORTED_EVENTS, {
    variables: {
      startTime: startTime,
      endTime: dayjs(startTime)
        .add(2, 'hours')
        .set('minutes', 59)
        .set('second', 0)
        .toISOString(),
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      if (data && data?.sortedEvents) {
        const filteredEvents = data?.sortedEvents
          .sort((eventA, eventB) => {
            const startEventA = new Date(eventA.startTime).getTime();
            const startEventB = new Date(eventB.startTime).getTime();
            // Sort events in ascending order based on the start time
            return startEventA - startEventB;
          })
          .filter(event => {
            const { line1, line2, startTime, endTime, logo1, rightsHolders } =
              event;
            // Check if all required properties exist
            if (
              !line1 ||
              !line2 ||
              !startTime ||
              !endTime ||
              !logo1 ||
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
        setEventList(filteredEvents);
      }
    },
    onError: error => {
      console.log('error : ', error);
    },
  });

  useQuery(GET_SORTED_EVENTS, {
    variables: {
      startTime: startSearchTime,
      endTime: endSearchTime,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      const currentTime = Date.now();
      if (
        ((reduxData && reduxData?.expire === currentTime) ||
          (reduxData &&
            reduxData?.eventList &&
            reduxData?.eventList.length <= 0)) &&
        data &&
        data?.sortedEvents.length > 0
      ) {
        const filteredEvents = data?.sortedEvents.filter(event => {
          const { line1, line2, startTime, endTime, logo1, rightsHolders } =
            event;
          // Check if all required properties exist
          if (
            !line1 ||
            !line2 ||
            !startTime ||
            !endTime ||
            !logo1 ||
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
        dispatch(setExpire(expireTime));
      }
    },
    onError: error => {
      console.log('error : ', error);
    },
  });

  const getTimeList = () => {
    const daysList = [];
    const currentHour = currentDate.hour(); // Get the current hour
    const currentDay = currentDate.startOf('day'); // Start from the beginning of the current day
    const hoursList = [];
    for (let i = 0; i < 7; i++) {
      const day = currentDay.add(i, 'day');
      if (i === 0) {
        for (let j = currentHour + 1; j < 24; j++) {
          const hour = day.hour(j);
          const hourDatetime = hour.toISOString();
          const hourObject = {
            id: i * 24 + j + 1,
            title: hour.format('h a'),
            selected: false,
            datetime: hourDatetime,
          };
          hoursList.push(hourObject);
        }
      } else {
        for (let j = 0; j < 24; j++) {
          const hour = day.hour(j);
          const hourDatetime = hour.toISOString();
          const hourObject = {
            id: i * 24 + j + 1,
            title: hour.format('h a'),
            selected: false,
            datetime: hourDatetime,
          };
          hoursList.push(hourObject);
        }
      }
      daysList.push(hoursList);
    }

    const timeData = daysList.flat();
    setTimeData(timeData);

    return timeData;
  };

  useEffect(() => {
    getTimeList();
  }, []);

  useEffect(() => {
    if (eventList && eventList.length > 0) {
      let filteredEvents;
      if (selectedCategory.includes('all')) {
        // If "all" category is selected, no need to filter, keep all events
        filteredEvents = eventList;
      } else {
        // Filter events based on the selected categories
        filteredEvents = eventList.filter(event =>
          selectedCategory.includes(event.category.name.toLowerCase()),
        );
      }
      setFilteredEventList(filteredEvents);
    }
  }, [eventList]);

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

  const handleSelectTime = index => {
    const selectedTime = timeData[index]?.datetime;
    if (index === 0) {
      setStartTime(dayjs(new Date()).toISOString());
    } else {
      setStartTime(selectedTime);
    }
    const updatedTimeData = timeData.map((element, i) => ({
      ...element,
      selected: i === index,
    }));
    setTimeData(updatedTimeData);
    setSelectedTimeIndex(index);
  };

  const endTimeWidth = end => {
    const startTime = dayjs(timeData[currentIndex]?.datetime);
    const endTime = dayjs(end);
    const timeDifference = endTime.diff(startTime); // Calculate the total time difference in milliseconds
    const minutesDiffference = Math.round(timeDifference / (1000 * 60));
    if (minutesDiffference <= 0) {
      let w =
        minutesDiffference < 0 ? 60 + minutesDiffference : minutesDiffference;
      return w === 0 ? '26%' : `${w / 2 - 4}%`;
    } else {
      let wid = minutesDiffference / 2 + 22;
      return `${wid}%`;
    }
  };

  const startTimeWidth = start => {
    const matchTime = dayjs(timeData[currentIndex]?.datetime);
    const startTime = dayjs(start);
    const timeDifference = startTime.diff(matchTime); // Calculate the total time difference in milliseconds
    const minutesDifference = Math.round(timeDifference / (1000 * 60));
    if (isLive && minutesDifference <= 0) {
      let w = minutesDifference * -1;
      if (w === 0) {
        return `26%`;
      } else if (w < 60) {
        return `${w / 2}%`;
      } else {
        return 0; // Return 0 for the live match time
      }
    } else if (minutesDifference > 0) {
      let wid = minutesDifference / 2 + 22;
      return `${wid}%`;
    } else {
      return 0; // Return 0 for any other cases
    }
  };
  // handle next timer to show next hour events
  const handleNext = () => {
    handleSelectTime(currentIndex + 1);
    setCurrentIndex(prevIndex => prevIndex + 1);
    setIsLive(false);
  };
  const handlePrevious = () => {
    if (currentIndex > 0) {
      handleSelectTime(currentIndex - 1);
      setCurrentIndex(prevIndex => prevIndex - 1);
      setIsLive(false);
    }

  };
  // handle live events
  const handleLive = () => {
    handleSelectTime(0);
    setCurrentIndex(0);
    setIsLive(true);
  };
  // handle to navigate to sign up for create account
  const handleCreateAccount = async () => {
    await setMySportModal(false);
    await dispatch(setGuest(false));
    await dispatch(setUser(false));
    navigation.navigate('Auth', {
      screen: 'Signup',
    });
  };
  // event list item component
  const ItemComponent = React.memo(({ item }) => {
    return (
      // Render your item component here
      dayjs(item?.endTime).isAfter(currentDate) ? (
        <TouchableOpacity
          style={styles.listContainer}
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
                width: item?.startTime ? startTimeWidth(item?.startTime) : 0,
                backgroundColor: Colors.darkBlue,
              }}></View>
            <View
              style={{
                width: endTimeWidth(item?.endTime),
                backgroundColor: dayjs(item?.startTime).isAfter(currentDate)
                  ? Colors.mediumBlue
                  : Colors.mediumGreen,
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
            {!data?.guest && (
              <TouchableOpacity
                style={{ position: 'absolute', right: 0, alignSelf: 'center' }}
              //  onPress={() => handleFvrt(item, index)}
              >
                <Image
                  source={Images.Favorite}
                  style={[styles.fvrtIcon]}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ) : null
    );
  });

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
                  <Text style={styles.sliderTxt}>
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
          gestureIsClickThreshold: 20
        }}>
        <View style={styles.timeSliderContainer}>
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
          </View>
          <View
            style={[styles.timeSliderInnerContainer, { width: screenWidth / 3 }]}>
            <FlatList
              horizontal
              data={timeData.slice(0, 2)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flex: 1, justifyContent: 'space-around' }}
              scrollEnabled={fontScale > 1 ? true : false}
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
                  backgroundColor: Colors.brandBlue,
                },
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
      {/* featured event */}
      {eventList && eventList.length > 0 ? (
        <TouchableOpacity style={styles.listContainer}>
          <View style={[{ backgroundColor: Colors.brandBlue, paddingBottom: 5 }]}>
            <View
              style={[
                styles.imageContainer,
                { backgroundColor: Colors.brandBlue },
              ]}>
              <ImageWithPlaceHolder
                source={eventList?.[0]?.logo1}
                placeholderSource={Constants.placeholder_trophy_icon}
                style={styles.imageIcon}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                width: eventList?.[0]?.startTime
                  ? startTimeWidth(eventList?.[0]?.startTime)
                  : 0,
                // backgroundColor: Colors.darkBlue,
              }}></View>
            <View
              style={{
                width: endTimeWidth(eventList?.[0]?.endTime),
                // backgroundColor: dayjs(eventList?.[0]?.startTime).isAfter(currentDate)
                //   ? Colors.mediumBlue
                //   : Colors.mediumGreen,
              }}></View>
            <View
              style={{
                flex: 1,
                // backgroundColor: Colors.darkBlue,
              }}></View>
            <View style={styles.userNameContainer}>
              <Text style={[styles.eventTxt, { marginTop: 5 }]} numberOfLines={1}>
                {eventList?.[0]?.line1}
              </Text>
              <Text style={styles.titleTxt} numberOfLines={1}>
                {eventList?.[0]?.line2
                  ? eventList?.[0]?.line2
                  : eventList?.[0]?.title}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.eventDateTxt]}>
                  {' '}
                  {eventList?.[0]?.startTime
                    ? dayjs(eventList?.[0]?.startTime).format('ddd. MM/D')
                    : eventList?.[0]?.day}
                  {'  l '}
                </Text>
                <Text style={[styles.eventDateTxt]}>
                  {' '}
                  {eventList?.[0]?.startTime
                    ? `${dayjs(eventList?.[0]?.startTime).format(
                      'h:mma',
                    )} - ${dayjs(eventList?.[0]?.endTime).format('h:mma')}`
                    : eventList?.[0]?.time}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
      {/* main event list */}
      {loading && currentIndex ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color={'#fff'} size={'large'} />
        </View>
      ) : (
        <ScrollView indicatorStyle={'white'}>
          <FlatList
            data={
              selectedCategory === 'all' && selectedTimeIndex >= 0
                ? eventList && eventList.length > 0
                  ? eventList
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
      {/* My Sport Popup for guest  */}
      <CustomMySportsModalView
        visible={mySportModal}
        desTxt={Strings.accessFeatures}
        blackBtnTxt={Strings.noThanks}
        otherBtnTxt={Strings.createFreeAccount}
        btn
        rowStyle={false}
        blackBtnPress={() => {
          setMySportModal(!mySportModal);
          setLiveMatchModal(true);
        }}
        otherBtnPress={() => {
          handleCreateAccount();
        }}
      />
    </ImageBackground>
  );
}
