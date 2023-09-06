import React, { useEffect, useState, useCallback } from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  RefreshControl
} from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CustomModalView from 'src/components/Modal/CustomModal';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import ShowMessage from 'src/components/ShowMessage';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CONSUMERS, GET_MY_SPORT } from 'src/graphQL';
import LoaderModal from 'src/components/LoaderModal';
import { setSportsList, setUser } from 'src/store/types';
const { fontScale } = Dimensions.get('window');

const data = [
  {
    id: 1,
    img: Images.BaseBall,
    name: 'Baseball',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 2,
    img: Images.BasketBall,
    name: 'Basketball',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 3,
    img: Images.BaseBall,
    name: 'Boxing',
    notifcationFlag: false,
    fvrtFlag: false,
  },
];

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

export default function Guide() {
  const navigation = useNavigation();
  const reduxData = useSelector(state => state.user);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState(categoryArr);
  const [reminderModal, setRemaindarModal] = useState(false);
  const [fvrtModal, setFvrtModal] = useState(reduxData?.guest === true ? true : false);
  const [mySportData, setSportData] = useState(data);
  const [curremIndex, setCurrentIndex] = useState();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEventList, setFilteredEventList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [updateConsumersMutation, { loading: loadingFavourite, error: errorFavourite }] = useMutation(DELETE_CONSUMERS);

  // Define a function to execute the mutation
  const deleteConsumers = async (id) => {
    if (id) {
      const updateData = {
        where: {
          cognitoId: reduxData?.userData?.sub
        },
        delete: {
          favoriteSports: [
            {
              where: {
                node: {
                  id: id,
                }
              }
            }
          ]
        },
      };
      try {
        const { data } = await updateConsumersMutation({
          variables: updateData,
        });
        if (!loadingFavourite && data?.updateConsumers?.consumers) {
          ShowMessage('Remove from Favorites successfully!')
          refetch()
        }
        // Handle the response data as needed
        console.log('Remove consumer:', data?.updateConsumers?.consumers?.[0]?.favoriteSports);
      } catch (err) {
        console.error('Error updating consumer:', err);
      }
    } else {
      ShowMessage('Invalid data')
    }
  };

  const { loading, refetch, error } = useQuery(GET_MY_SPORT, {
    variables: {
      consumersWhere2: {
        cognitoId: reduxData?.userData?.sub,
      },
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      console.log('Updated consumer:', data?.consumers?.[0]?.favoriteSports.length);
      if (reduxData?.user && !loading && data && data?.consumers && data?.consumers.length > 0) {
        const filteredEvents = data?.consumers?.[0]?.favoriteSports.filter(element => {
          const { sport, categories } = element;
          // Check if all required properties exist
          if (sport?.name
            && categories && categories.length > 0
          ) {
            return true;
          }
          return false;
        });
        setSportData(filteredEvents)
        dispatch(setSportsList(filteredEvents));
      }
    },
    onError: error => {
      console.log('error : ', error);
    },
  });
  
  useEffect(() => {
    if (isFocused) {
      if(reduxData?.guest){
        setFvrtModal(true);
      }
      refetch()
    }
  }, [isFocused])

  const handleReminder = (item, index) => {
    setCurrentIndex(index);
    setRemaindarModal(!reminderModal);
  };
  const handleFvrt = (item, index) => {
    setCurrentIndex(index);
    if (reduxData?.user) {
      console.log(reduxData?.userData?.sub,' sub ' ,item?.id)
      deleteConsumers(item?.id)
    } else {
      setFvrtModal(!fvrtModal);
    }
  };
  const handleNotificationAlert = () => {
    let list = [...mySportData];
    list[curremIndex].notifcationFlag = !list[curremIndex].notifcationFlag;
    setSportData(list);
    setRemaindarModal(!reminderModal);
  };
  const handleFvrtAlert = () => {
    let list = [...mySportData];
    list[curremIndex].fvrtFlag = !list[curremIndex].fvrtFlag;
    setSportData(list);
    setFvrtModal(!fvrtModal);
    navigation.navigate('Auth', { screen: 'Signup' });
  };

  const handleSelectedCategory = (e, index) => {
    if (index === 0 && selectedCategory === 'all') {
      return;
    }

    let list = [...categoryData];

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

    // Filter events based on selected categories
    const selectedCategories = list.filter(category => category.selected);
    const selectedCategoryValues = selectedCategories.map(
      category => category.value
    );

    let filteredEvents = [];

    if (selectedCategories.length === 1 && selectedCategoryValues[0] === 'all') {
      setSelectedCategory('all');
      filteredEvents = mySportData; // Use all data when 'all' category is selected
    } else {
      filteredEvents = mySportData.filter(item => {
        // Extract the names from item.categories
        const categoryNames = item?.categories.map(category => category.name);
        // Check if at least one of the selected categories matches any category name in the item
        return selectedCategoryValues.some(selectedCategory =>
          categoryNames.includes(selectedCategory)
        );
      });

    }
    setSelectedCategory(selectedCategoryValues);
    setCategoryData(list);
    setFilteredEventList(filteredEvents);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    console.log("Refreddd")
    wait(2000).then(() => setRefreshing(false));
  }, []);

    // handle to navigate to sign up for create account
    const handleCreateAccount = async () => {
      setFvrtModal(!fvrtModal)
      await dispatch(setUser(false));
      navigation.navigate('Auth', {
        screen: 'Signup',
      });
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
              onPress={() => reduxData?.user ? handleSelectedCategory(item, index) : {}}
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
      {/*  header text */}
      <View style={styles.mangeFvrtContainer}>
        <Text style={styles.mangeFavTxt}>{Strings.manageFavorite}</Text>
      </View>
      {/* main list */}
      <FlatList
        data={selectedCategory === 'all' && mySportData && mySportData.length > 0
          ? mySportData : reduxData?.user ? filteredEventList : mySportData
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
        renderItem={({ item, index }) => (
          (reduxData?.user && item?.sport?.name && item?.categories?.[0]?.name) || item?.name ?
            <View style={styles.listContainer}>
              <View style={styles.innerContainer}>
                <Image
                  source={Images.BaseBall}
                  style={styles.imageIcon}
                  resizeMode={'contain'}
                />
                <View style={styles.userNameContainer}>
                  <Text style={styles.titleTxt}>{item?.sport?.name || item?.name}</Text>
                </View>
                <TouchableOpacity
                // onPress={() => handleReminder(item, index)}
                >
                  <Image
                    source={Images.Bell}
                    resizeMode={'contain'}
                    style={[
                      styles.bellIcon,
                      {
                        tintColor: item?.notifications || item?.notifcationFlag
                          ? Colors.darkOrange
                          : Colors.white,
                      },
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => handleFvrt(item, index)}
                >
                  <Image
                    source={!item?.fvrtFlag ? Images.FilledFvrt : Images.Favorite}
                    style={[
                      styles.fvrtIcon,
                      { tintColor: item?.fvrtFlag && Colors.orange },
                    ]}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>
            </View> : null
        )}
        ListEmptyComponent={
          <View>
            <Text style={styles.emptyTxt}>{Strings.emptyFavoriteSportList}</Text>
          </View>
        }
      />
      {/* event reminder pop up  */}
      <CustomModalView
        visible={reminderModal}
        headerTxt={Strings.eventReminder}
        desTxt={Strings.eventReminderNotifications}
        headerTxtStyle={styles.headerTxtStyle}
        dexTxtStyle={styles.dexTxtStyle}
        blackBtnTxt={Strings.no}
        otherBtnTxt={Strings.yes}
        fillBefore={false}
        btn
        rowStyle={true}
        blue
        blackBtnPress={() => setRemaindarModal(!reminderModal)}
        otherBtnPress={() => handleNotificationAlert()}
      />
      {/* Access Features pop up  */}
      <CustomModalView
        visible={fvrtModal}
        desTxt={Strings.accessFeatures}
        blackBtnTxt={Strings.noThanks}
        otherBtnTxt={Strings.createFreeAccount}
        fillBefore={false}
        btn
        rowStyle={false}
        blackBtnPress={() => {setFvrtModal(!fvrtModal)
        navigation.navigate('Guide')
        }}
        otherBtnPress={() => handleCreateAccount()}
      />
      <LoaderModal visible={reduxData?.user ? loading : false} loadingText={''} />
    </ImageBackground>
  );
}
