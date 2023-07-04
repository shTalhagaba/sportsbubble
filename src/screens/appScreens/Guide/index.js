import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {Images, Colors, Strings} from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import LiveMatchView from 'src/components/Modal/LiveMatchModal';
import {useQuery} from '@apollo/client';
import dayjs from 'dayjs';
import {GET_SORTED_EVENTS} from './queries';

const list = [
  {
    id: 1,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
    live: true,
    percentage: '25%',
  },
  {
    id: 2,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
    live: true,
    percentage: '35%',
  },
  {
    id: 3,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
    live: true,
    percentage: '45%',
  },
  {
    id: 4,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
    live: false,
    percentage: '55%',
  },
  {
    id: 5,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
    live: false,
    percentage: '65%',
  },
];
const timeArr = [
  {
    id: 1,
    title: 'Live',
    selected: true,
    datetime: dayjs(new Date()).toISOString(),
  }
];
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

export default function Guide() {
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [liveMatchModal, setLiveMatchModal] = useState(false);
  const [timeData, setTimeData] = useState(timeArr);
  const [categoryData, setCategoryData] = useState(categoryArr);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [eventList, setEventList] = useState();
  const [filteredEventList, setFilteredEventList] = useState([]);
  const [startTime, setStartTime] = useState(
    dayjs(new Date()).subtract(1, 'day').toISOString(),
  );
  const [endTime, setEndTime] = useState(
    dayjs(new Date()).add(1, 'day').toISOString(),
  );

  useEffect(() => {
    getTimeList();
  }, []);

  useEffect(() => {
    if (eventList && eventList.length > 0) {
      getCategoryList();
    }
  }, [eventList]);

  const getCategoryList = () => {
    const categorySet = new Set(eventList.map(item => item.category.name));
    const categoryList = Array.from(categorySet);
    let list = [
      {
        id: 1,
        title: 'all',
        value: 'all',
        selected: true,
      },
      ...categoryList.map((element, index) => ({
        id: index + 2,
        title: element,
        value: element,
      })),
    ];
    setCategoryData(list);
  };

  const getTimeList = () => {
    const currentHour = dayjs().hour(); // Get the current hour
    const hoursList = [...timeArr];

    for (let i = 1; i < 6; i++) {
      const hour = currentHour + i;
      const hourDatetime = dayjs().hour(hour).toISOString();
      const hourObject = {
        id: i + 1,
        title: dayjs().hour(hour).format('h A'),
        selected: false,
        datetime: hourDatetime,
      };
      hoursList.push(hourObject);
    }
    setTimeData(hoursList);
  };

  const {loading, refetch, error} = useQuery(GET_SORTED_EVENTS, {
    variables: {
      // startTime: startTime,
      // endTime: endTime,
      startTime: '2023-06-04T20:30:00.000Z',
      endTime: '2023-06-04T22:30:00.000Z',
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      setEventList(data?.sortedEvents);
      setIsRefreshing(false);
    },
    onError: error => {
      console.log('error : ', error);
    },
  });

  const handleSelectedCategory = (e, index) => {
    let list = [...categoryData];
    const selectedTime = timeData[selectedTimeIndex].datetime;
    const formattedTime = dayjs(selectedTime).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    let filteredEvents;

    list.map(element => {
      element.selected = false;
    });
    list[index].selected = !list[index].selected;
    setCategoryData(list);
    setSelectedCategory(e?.value);

    if (selectedTimeIndex === 0) {
      // For the first index (index === 0), filter events after the selected time
      filteredEvents = eventList.filter(
        event =>
          (event.category.name === e?.value)
      );
    } else {
      // For other indices, filter events that have the same start time as the selected time
      filteredEvents = eventList.filter(
        event =>
          (event.category.name === e?.value) &&
          dayjs(event.startTime).isAfter(formattedTime)
      );
    }
    setFilteredEventList(filteredEvents);
  };

  const handleSelectTime = (item, index) => {
    setSelectedTimeIndex(index)
    const selectedTime = timeData[index].datetime;
    const formattedTime = dayjs(selectedTime).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  
    let filteredEvents;
    if (index === 0) {
      // For the first index (index === 0), filter events after the selected time
      filteredEvents = eventList.filter(
        event =>
          (event.category.name === selectedCategory)
      );
    } else {
      // For other indices, filter events that have the same start time as the selected time
      filteredEvents = eventList.filter(
        event =>
          (event.category.name === selectedCategory) &&
          dayjs(event.startTime).isAfter(formattedTime)
      );
    }
  
    const updatedTimeData = timeData.map((element, i) => ({
      ...element,
      selected: i === index,
    }));
  
    setStartTime(selectedTime);
    setTimeData(updatedTimeData);
    setFilteredEventList(filteredEvents);
  };
  
  

  const durationTwoTimes = (start, end) => {
    // Example date times
    const startTime = new Date(start);
    const endTime = new Date(end);
    // Calculate the duration in minutes
    const durationInMinutes = Math.round((endTime - startTime) / (1000 * 60));
    // Calculate the percentage of the duration
    const percentage = (durationInMinutes / (24 * 60)) * 100; // Assuming the duration is within a day
    return (percentage || 0) * 20;
  };

  const liveTimeProgress = (start, end) => {
    const currentTime = dayjs(); // Get the current time
    const startTime = dayjs(start);
    const endTime = dayjs(end);
    const timeDifference = endTime.diff(startTime); // Calculate the total time difference
    const timeProgress = currentTime.diff(startTime); // Calculate the current time progress
    const progressPercentage = (timeProgress / timeDifference) * 100; // Calculate the progress percentage
    return -progressPercentage || false;
  };

  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar backgroundColor={Colors.mediumBlue} />
      {/* Header with Logo only  */}
      <AppHeader centerImage={Images.Logo} />
      {/* Slider all pro  */}
      <View style={styles.sliderContainer}>
        <FlatList
          horizontal
          data={categoryData}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => handleSelectedCategory(item, index)}
              style={styles.sliderInnerContainer}>
              <View
                style={[
                  styles.sliderInnerMainContainer,
                  {borderWidth: item?.selected ? 2 : 0},
                ]}>
                <ImageBackground
                  source={
                    item?.selected
                      ? Images.ActiveSliderBack
                      : Images.InActiveSliderBorder
                  }
                  style={styles.sliderImageBackground}
                  resizeMode={'contain'}>
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
      <View style={styles.timeSliderContainer}>
        <View style={styles.timeSliderInnerContainer}>
          <FlatList
            horizontal
            data={timeData}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => handleSelectTime(item, index)}
                style={[
                  styles.timeContainer,
                  {
                    backgroundColor: item?.selected
                      ? Colors?.mediumGreen
                      : Colors.mediumBlue,
                  },
                ]}>
                <Text
                  style={
                    item?.selected
                      ? styles.sliderActiveTimeTxt
                      : styles.sliderInactiveTimeTxt
                  }>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity style={styles.nextContainer}>
          <Image
            source={Images.Arrow}
            style={styles.rightIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      {/* main list  */}
      {!loading ? (
        <FlatList
          data={
            selectedCategory === 'all' && selectedTimeIndex === 0
              ? eventList && eventList.length > 0
                ? eventList
                : selectedTimeIndex > 0 ? filteredEventList :list
              : filteredEventList
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.listContiner}
              onPress={() => navigation.navigate('Watch', {item: item})}>
              <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={item?.logo1 ? {uri: item?.logo1} : item?.img}
                    style={styles.imageIcon}
                    resizeMode={'contain'}
                  />
                </View>
                <View
                  style={
                    liveTimeProgress(item?.startTime, item?.endTime)
                      ? {
                          width: durationTwoTimes(
                            item?.startTime,
                            item?.endTime,
                          ),
                          backgroundColor: Colors.mediumGreen,
                        }
                      : {
                          width: durationTwoTimes(
                            item?.startTime,
                            item?.endTime,
                          ),
                          backgroundColor: Colors.darkBlue,
                        }
                  }></View>
                <View
                  style={
                    liveTimeProgress(item?.startTime, item?.endTime)
                      ? {
                          flex: 1,
                          backgroundColor: Colors.darkBlue,
                        }
                      : {
                          flex: 1,
                          backgroundColor: Colors.mediumBlue,
                        }
                  }></View>
                <View style={styles.userNameContainer}>
                  <Text
                    style={[styles.eventTxt, {marginTop: 5}]}
                    numberOfLines={1}>
                    {item?.line1 ? item?.line1 : item?.companyName}
                  </Text>
                  <Text style={styles.titleTxt} numberOfLines={1}>
                    {item?.line2 ? item?.line2 : item?.title}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={[
                        styles.eventTxt,
                        {
                          opacity:
                            dayjs(item?.startTime).format('yyyy') === '2023'
                              ? 1
                              : 0.5,
                        },
                      ]}>
                      {' ' + item?.startTime
                        ? dayjs(item?.startTime).format('ddd. MM/D')
                        : item?.day}{' '}
                    </Text>
                    <Text
                      style={[
                        styles.eventTxt,
                        {
                          opacity:
                            dayjs(item?.startTime).format('yyyy') === '2023'
                              ? 1
                              : 0.5,
                        },
                      ]}>
                      {' ' + item?.startTime
                        ? dayjs(item?.startTime).format('h:mm A') +
                          ' - ' +
                          dayjs(item?.endTime).format('h:mm A')
                        : item?.time}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ActivityIndicator />
      )}
      <LiveMatchView
        setLiveMatchModal={setLiveMatchModal}
        liveMatchModal={liveMatchModal}
      />
    </ImageBackground>
  );
}
