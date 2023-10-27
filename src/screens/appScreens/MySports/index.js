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
import CustomMySportsModalView from 'src/components/Modal/CustomMySportsModalView';
import CustomModalView from 'src/components/Modal/CustomModal';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import ShowMessage from 'src/components/ShowMessage';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CONSUMERS, GET_MY_SPORT, GET_MY_SPORT_LIST, UPDATE_CONSUMERS, UPDATE_NOTIFICATION_CONSUMERS } from 'src/graphQL';
import LoaderModal from 'src/components/LoaderModal';
import { setSportsList, setUser } from 'src/store/types';
import { categoryArrMySports } from 'src/utils/list';
import { subscribeInterest, unsubscribeInterest } from "src/components/Pusher/PusherBeans";
import { checkNotifications, requestNotifications, openSettings } from 'react-native-permissions';
import { initializePusher } from 'src/components/Pusher/PusherBeans';
import useSportsList from 'src/services/useSportsList';
const { fontScale } = Dimensions.get('window');

export default function MySports() {
  const navigation = useNavigation();
  const reduxData = useSelector(state => state.user);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { loading, refetch, favoriteSports } = useSportsList('network-only');
  const [reminderModal, setReminderModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [fvrtModal, setFvrtModal] = useState(reduxData?.guest === true ? true : false);
  const [mySportData, setSportData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [isPusherInitiazed, setPusherInitiazed] = useState(false);

  const [categoryData, setCategoryData] = useState(categoryArrMySports);
  const [selectedCategory, setSelectedCategory] = useState('pro');
  const [filteredEventList, setFilteredEventList] = useState([]);

  const [deleteConsumersMutation, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_CONSUMERS);
  const [updateConsumersMutation, { loading: loadingFavourite, error: errorFavourite }] = useMutation(UPDATE_CONSUMERS);
  const [updateNotificationMutation, { loading: loadingNotification, error: errorNotification }] = useMutation(UPDATE_NOTIFICATION_CONSUMERS);
  // console.log("MySports FavoriteSports:: ", favoriteSports)
  // Define a function to execute the mutation
  const updateConsumers = async (categories, sport, flag, isBellIcon) => {
    if (categories?.id && sport?.id) {
      const updateData = {
        where: {
          cognitoId: reduxData?.userData?.sub
        },
        create: {
          favoriteSports: [
            {
              node: {
                notifications: flag ? false : true,
                sport: {
                  connect: {
                    where: {
                      node: {
                        id: sport?.id
                      }
                    }
                  }
                },
                categories: {
                  connect: [
                    {
                      where: {
                        node: {
                          id: categories?.id
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      };
      try {
        const { data } = await updateConsumersMutation({
          variables: updateData,
        });
        if (!loadingFavourite && data?.updateConsumers?.consumers) {
          ShowMessage('Added to Favorites successfully! ', data?.updateConsumers?.consumers)
          if (data?.updateConsumers?.consumers?.[0]?.favoriteSports && data?.updateConsumers?.consumers?.[0]?.favoriteSports.length > 0) {
            dispatch(setSportsList(data?.updateConsumers?.consumers?.[0]?.favoriteSports));
            console.log("Subscribe: ", data?.updateConsumers?.consumers?.[0]?.favoriteSports?.[0]?.sport.name)
            if (isBellIcon) {
              subscribeInterest(data?.updateConsumers?.consumers?.[0]?.favoriteSports?.[0]?.sport.name)
            }
          }
        }
        console.log('Updated consumer:', data?.updateConsumers?.consumers);
      } catch (err) {
        console.error('Error updating consumer:', err);
      }
    } else {
      ShowMessage('Invalid data')
    }
  };
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
        const { data } = await deleteConsumersMutation({
          variables: updateData,
        });
        if (!loadingDelete && data?.updateConsumers?.consumers) {
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
  // Define a function to execute the mutation
  const updateNotificationConsumers = async (id, flag) => {
    if (id) {
      const updateData = {
        where: {
          cognitoId: reduxData?.userData?.sub
        },
        update: {
          favoriteSports: [
            {
              update: {
                node: {
                  notifications: !flag
                }
              },
              where: {
                node: {
                  id: id
                }
              }
            }
          ]
        },
      };
      try {
        const { data } = await updateNotificationMutation({
          variables: updateData,
        });
        if (!loadingFavourite && data?.updateConsumers?.consumers) {
          ShowMessage(flag ? 'Notification is inActive.' : 'Notification is Active')
          refetch()
        }
        // Handle the response data as needed
        if (isPusherInitiazed) {
          if (flag) {
            unsubscribeInterest(data?.updateConsumers?.consumers?.[0]?.favoriteSports?.[0]?.sport.name)
            console.log('Remove consumer:', data?.updateConsumers?.consumers?.[0]?.favoriteSports?.[0]?.sport.name);
          } else {
            subscribeInterest(data?.updateConsumers?.consumers?.[0]?.favoriteSports?.[0]?.sport.name)
            console.log('Add consumer:', data?.updateConsumers?.consumers?.[0]?.favoriteSports?.[0]?.sport.name);
          }
        }
      } catch (err) {
        console.error('Error updating consumer:', err);
      }
    } else {
      // ShowMessage('Invalid data 3')
    }
  };

  const { loading: listLoading, refetch: listRefetch, error: listError } = useQuery(GET_MY_SPORT_LIST, {
    variables: {
      where: {
        showInPassport: true
      }
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      if (reduxData?.user && !listLoading && data && data?.sports && data?.sports.length > 0) {
        const filteredEvents = data?.sports.filter(element => {
          const { name, categories } = element;
          // Check if all required properties exist
          if (name
            && categories && categories.length > 0
          ) {
            return true;
          }
          return false;
        });
        setSportData(filteredEvents)
      }
    },
    onError: error => {
      console.log('error : ', error);
    },
  });

  useEffect(() => {
    if (isFocused) {
      if (reduxData?.guest) {
        setFvrtModal(true);
      }
      refetch()
      listRefetch()
    }
  }, [isFocused])

  useEffect(() => {
    let filteredEvents = [];

    if (selectedCategory === 'others') {
      filteredEvents = mySportData.filter(item => {
        // Filter out "Pro," "College," and "Esports" categories
        return !item?.categories.some(category => ['pro', 'college', 'e-sports'].includes(category.name));
      });
    } else {
      filteredEvents = mySportData.filter(item => {
        // Extract the names from item.categories
        const categoryNames = item?.categories.map(category => category.name);
        return categoryNames.includes(selectedCategory);
      });
    }

    setFilteredEventList(filteredEvents);
  }, [selectedCategory, mySportData]);



  const handleReminder = async (item, index, selectedItem) => {
    // If event notification already enabled, no need to check permissions
    if (selectedItem?.[0]?.notifications) {
      updateDB(item, index, selectedItem)
    }
    else {
      if (await checkPermission()) {
        if (!isPusherInitiazed) {
          initializePusher()
          setPusherInitiazed(true)
        }
        updateDB(item, index, selectedItem)
      }
    }
  };

  const updateDB = (item, index, selectedItem) => {
    if (!selectedItem || !selectedItem?.[0]?.notifications) {
      updateConsumers(item?.categories?.[0], item, item?.[0]?.notifications, true)
    } else {
      setCurrentIndex(selectedItem?.[0] || item);
      handleNotificationAlert(selectedItem?.[0] || item)
    }
  }

  const handleFvrt = (item, selectedItem) => {
    if (reduxData?.user) {
      setCurrentIndex(selectedItem?.[0]);
      if (selectedItem && selectedItem.length > 0) {
        selectedItem.map((element) => {
          deleteConsumers(element?.id)
        })
      } else {
        updateConsumers(item?.categories?.[0], item, selectedItem?.[0]?.notifications, true)
      }
    } else {
      setFvrtModal(!fvrtModal);
    }
  };

  const handleNotificationAlert = (selectedIndex) => {
    if (selectedIndex) {
      updateNotificationConsumers(selectedIndex?.id, selectedIndex?.notifications)
    }
  };
  const handleSelectedCategory = (e, index) => {
    if (mySportData?.length > 0) {
      let list = [...categoryData];
      list.forEach(element => {
        element.selected = false;
      });
      list[index].selected = true;

      const selectedCategoryValue = list[index].value;
      let filteredEvents = [];

      if (selectedCategoryValue === 'other') {
        filteredEvents = mySportData.filter(item => {
          const categoryNames = item?.categories?.map(category => category?.name);
          return (
            categoryNames &&
            categoryNames.length > 0 &&
            !categoryNames.includes('Pro') &&
            !categoryNames.includes('College') &&
            !categoryNames.includes('Esports')
          );
        });
      } else if (selectedCategoryValue === 'all') {
        // Handle the case when 'All' is selected by showing all events
        filteredEvents = mySportData;
      } else {
        // Handle the case when a specific category is selected
        filteredEvents = mySportData.filter(item => {
          const categoryNames = item?.categories?.map(category => category?.name);
          return (
            categoryNames &&
            categoryNames.includes(selectedCategoryValue)
          );
        });
      }
      setSelectedCategory(selectedCategoryValue); // Update the selected category value
      setCategoryData(list);
      setFilteredEventList(filteredEvents);
    }
  };



  // const handleSelectedCategory = (e, index) => {
  //   if (mySportData?.length > 0) {
  //     let list = [...categoryData];

  //     // Deselect all categories
  //     list.forEach(element => {
  //       element.selected = false;
  //     });

  //     // Select the clicked category
  //     list[index].selected = true;

  //     const selectedCategoryValue = list[index].value;
  //     let filteredEvents = [];

  //     if (selectedCategoryValue === 'others') {
  //       filteredEvents = mySportData.filter(item => {
  //         const categoryNames = item?.categories.map(category => category?.name);
  //         return (
  //           categoryNames &&
  //           categoryNames.length > 0 &&
  //           !categoryNames.includes('pro') &&
  //           !categoryNames.includes('college') &&
  //           !categoryNames.includes('e-sports')
  //         );
  //       });
  //     } else if (selectedCategoryValue !== 'all') {
  //       filteredEvents = mySportData.filter(item => {
  //         const categoryNames = item?.categories.map(category => category?.name);
  //         return categoryNames.includes(selectedCategoryValue);
  //       });
  //     }

  //     setCategoryData(list);
  //     setFilteredEventList(filteredEvents);
  //   }
  // };


  // const handleSelectedCategory = (e, index) => {
  //   if (mySportData?.length > 0) {
  //     if (index === 0 && selectedCategory === 'all') {
  //       return;
  //     }
  //     let list = [...categoryData];
  //     list[index].selected = !list[index].selected;
  //     if (index === 0) {
  //       list.forEach((element, idx) => {
  //         if (idx !== 0) {
  //           element.selected = false;
  //         }
  //       });
  //     } else {
  //       const otherSelected = list.slice(1).some(element => element.selected);
  //       if (!otherSelected) {
  //         list[0].selected = true;
  //       } else {
  //         list[0].selected = false;
  //       }
  //     }
  //     // Filter events based on selected categories
  //     const selectedCategories = list.filter(category => category.selected);
  //     const selectedCategoryValues = selectedCategories.map(
  //       category => category.value
  //     );
  //     let filteredEvents = [];

  //     if (selectedCategories.length === 1 && selectedCategoryValues[0] === 'all') {
  //       setSelectedCategory('all');
  //       filteredEvents = mySportData; // Use all data when 'all' category is selected
  //     } else {
  //       // Handle the "Other" category filtering
  //       if (selectedCategoryValues.includes('others')) {
  //         // Filter out "Pro," "College," and "Esports"
  //         filteredEvents = mySportData.filter(item => {
  //           // Extract the names from item.categories
  //           const categoryNames = item?.categories.map(category => category?.name);
  //           return (
  //             categoryNames &&
  //             categoryNames.length > 0 &&
  //             !categoryNames.includes('pro') &&
  //             !categoryNames.includes('college') &&
  //             !categoryNames.includes('e-sports')
  //           );
  //         });
  //       } else {
  //         filteredEvents = mySportData.filter(item => {
  //           // Extract the names from item.categories
  //           const categoryNames = item?.categories.map(category => category?.name);
  //           return selectedCategoryValues.some(selectedCategory =>
  //             categoryNames.includes(selectedCategory)
  //           );
  //         });
  //       }
  //     }

  //     setSelectedCategory(selectedCategoryValues);
  //     setCategoryData(list);
  //     setFilteredEventList(filteredEvents);
  //   }
  // };


  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
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



  const checkPermission = () => {
    return new Promise((resolve, reject) => {
      checkNotifications().then(({ status, settings }) => {
        //UNAVAILABLE: This feature is not available (on this device / in this context)
        //DENIED: The permission has not been requested / is denied but requestable
        //BLOCKED: The permission is denied and not requestable anymore
        //GRANTED: The permission is granted
        switch (status) {
          case "granted":
            resolve(true)
            break;

          case "denied":
            requestNotifications(['alert', 'sound']).then(({ status, settings }) => {
              if (status == "granted") {
                resolve(true)
              } else {
                resolve(false)
              }
            });
            break;

          case "blocked":
            setSettingsModal(true)
            resolve(false)
            break;

          case "unavailable":
            ShowMessage(Strings.notSupportedNotifications)
            resolve(false)
            break;

          default:
          // code block
        }
      });
    })
  }

  const goToSettings = () => {
    openSettings().catch(() => console.warn('cannot open settings'))
    setSettingsModal(false)
  }


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
          scrollEnabled={true}
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
                        ? Images.Crown
                        : index === 1
                          ? Images.College
                          : index === 2
                            ? Images.Game
                            : Images.Trophy
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
        renderItem={({ item, index }) => {
          const sportsIds = reduxData?.sportsList && reduxData?.sportsList.length > 0 ? reduxData?.sportsList.map(element => element?.sport?.id) : [];
          const selectedItem = reduxData?.sportsList && reduxData?.sportsList.length > 0 ? reduxData?.sportsList.filter(element => element?.sport?.id === item?.id) : [];
          return (
            (reduxData?.user && item?.name && item?.categories?.[0]?.name) || item?.name ?
              <View style={styles.listContainer}>
                <View style={styles.innerContainer}>
                  <Image
                    source={Images.BaseBall}
                    style={styles.imageIcon}
                    resizeMode={'contain'}
                  />
                  <View style={styles.userNameContainer}>
                    <Text style={styles.titleTxt}>{item?.name || item?.name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleReminder(item, index, selectedItem)}
                  >
                    <Image
                      source={Images.Bell}
                      resizeMode={'contain'}
                      style={[
                        styles.bellIcon,
                        {
                          tintColor: selectedItem?.[0]?.notifications || item?.notifcationFlag
                            ? Colors.darkOrange
                            : Colors.white,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleFvrt(item, selectedItem)}
                  >
                    <Image
                      source={sportsIds && sportsIds.length > 0 && sportsIds.includes(item?.id) ? Images.FilledFvrt : Images.Favorite}
                      style={[
                        styles.fvrtIcon,
                        sportsIds && sportsIds.length > 0 && sportsIds.includes(item?.id) ? { tintColor: Colors.darkOrange } : {},
                      ]}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                </View>
              </View> : null
          )
        }}
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
        blackBtnPress={() => setReminderModal(!reminderModal)}
        otherBtnPress={() => handleNotificationAlert(currentIndex)}
      />
      {/* My Sport Popup for guest  */}
      {fvrtModal ?
        <CustomMySportsModalView
          visible={fvrtModal}
          desTxt={Strings.accessFeatures}
          blackBtnTxt={Strings.noThanks}
          otherBtnTxt={Strings.createFreeAccount}
          btn
          rowStyle={false}
          blackBtnPress={() => {
            setFvrtModal(!fvrtModal)
            navigation.navigate('Guide')
          }}
          otherBtnPress={() => {
            handleCreateAccount();
          }}
        /> : null}

      <CustomModalView
        visible={settingsModal}
        headerTxt={Strings.enableNotification}
        desTxt={Strings.enableNotificationDesc}
        headerTxtStyle={styles.headerTxtStyle}
        dexTxtStyle={styles.dexNotiTxtStyle}
        blackBtnTxt={Strings.cancel}
        otherBtnTxt={Strings.settings}
        fillBefore={false}
        btn
        rowStyle={true}
        blue
        blackBtnPress={() => setSettingsModal(false)}
        otherBtnPress={() => goToSettings()}
      />

      <LoaderModal visible={reduxData?.user ? loading || loadingFavourite : false} loadingText={''} />
    </ImageBackground>
  );
}
