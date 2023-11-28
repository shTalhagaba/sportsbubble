import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import AppHeader from 'src/components/AppHeader';
import { Images, Colors, Constants } from 'src/utils';
import Strings from 'src/utils/strings';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { DELETE_FAVORITE_RIGHTSHOLDER, FETCH_ALL_RIGHTSHOLDERS, GET_FAVORITE_RIGHTSHOLDER, SELECT_FAVORITE_RIGHTSHOLDER } from 'src/graphQL';
import ImageWithPlaceHolder from 'src/components/ImageWithPlaceHolder';
import SvgRenderer from 'src/components/SvgRenderer';
import ShowMessage from 'src/components/ShowMessage';

export default function SportStreaming() {
  const navigation = useNavigation();
  let isFocused = useIsFocused()
  const reduxData = useSelector(state => state.user);
  const [favoriteRightsHolders, setFavoriteRightsHolders] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isFocusedFlag, setIsFocusedFlag] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [selecting, setSelecting] = useState(false)
  const inputRef = useRef(null);

  const [fetchFavorites, { data: favoritesData }] = useLazyQuery(GET_FAVORITE_RIGHTSHOLDER)
  const [markFavorite, { data: markFavoriteData }] = useMutation(SELECT_FAVORITE_RIGHTSHOLDER)
  const [removeFavorite, { data: removeFavoriteData }] = useMutation(DELETE_FAVORITE_RIGHTSHOLDER)

  const [fetchRightsHolders, { loading, data }] = useLazyQuery(FETCH_ALL_RIGHTSHOLDERS, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      if (data?.rightsHolders && data?.rightsHolders.length > 0) {
        setFavoriteRightsHolders(data?.rightsHolders)
      }
    },
    onError: error => {
      console.log('error : ', error);
    },
  });

  // const handleSelectSports = (item, index) => {
  //   let list = [...favoriteRightsHolders];
  //   list[index].selected = !list[index].selected;
  //   let l = list.filter(item => item.selected);
  //   setSelectedItems(l);
  //   setFavoriteRightsHolders(list);
  // };

  const handleSelect = async (name) => {
    try {
      setSelecting(true);

      if (checkIfFavorite(name)) {
        await removeFavorite({
          variables: {
            cognitoId: reduxData?.userData?.sub,
            rightsHolderName: name,
          },
        });
      } else {
        await markFavorite({
          variables: {
            cognitoId: reduxData?.userData?.sub,
            rightsHolderName: name,
          },
        });
      }
      await fetchFavorites({
        variables: { cognitoId: reduxData?.userData?.sub },
        fetchPolicy: 'no-cache',
      });
    } catch (error) {
      ShowMessage(error?.message);
    } finally {
      setSelecting(false);
    }
  };


  useEffect(() => {
    if (!searchText) {
      setFavoriteRightsHolders(data?.rightsHolders)
    } else {
      const filteredRightsHolders = data?.rightsHolders?.filter((rightsHolder) => rightsHolder?.name?.toLowerCase().includes(searchText?.toLowerCase()))
      setFavoriteRightsHolders(filteredRightsHolders)
    }
  }, [data, markFavoriteData, removeFavoriteData, searchText])

  useEffect(() => {
    if (isFocused) {
      fetchRightsHolders()
      fetchFavorites({ variables: { cognitoId: reduxData?.userData?.sub } })
      handleFocus()
      // inputRef?.current?.focus();
      Keyboard.dismiss();
    }
    return () => {
      Keyboard.dismiss();
      setIsFocusedFlag(false)
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

  const checkIfFavorite = (name) => {
    return favoritesData?.consumers?.[0]?.favoriteRightsHolders?.filter((favoriteRightHolder) => favoriteRightHolder?.name === name)?.length > 0
  }

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
  };
  const handleInputChange = text => {
    setSearchText(text);
  };

  const handleEnd = () => {
    if (isKeyboardOpen) {
      Keyboard.dismiss()
    } else {
      inputRef?.current?.focus()
    }
  }

  return (
    <ImageBackground
      source={Images.Background}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{ tintColor: Colors.darkOrange }}
        SimpleView
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTxt}>{Strings.sportStreaming}</Text>
        <Text style={styles.desTxt}>{Strings.sportStreamingDes}</Text>
        {/* Search text box */}
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() => inputRef.current?.focus()}
            style={[
              styles.searchContainer,
              isFocusedFlag ? styles.focus : styles.blur,
            ]}>
            <View style={{ flex: 1 }}>
              {isFocusedFlag && (
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
                  <Text style={styles.searchTxt}>{Strings.search}</Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginLeft: 12,
                }}>
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
                  // autoFocus={true}
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
            <TouchableOpacity onPress={handleClear} style={{ padding: 10 }}>
              <Image
                source={Images.Cross}
                style={styles.crossImage}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          {/* main list */}
          {false ?
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator color={'#fff'} size={'large'} />
            </View> :
            <FlatList
              data={favoriteRightsHolders}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              removeClippedSubviews={true} // Unmount components when outside of window
              initialNumToRender={50} // Reduce initial render amount
              maxToRenderPerBatch={20} // Reduce number in each render batch
              updateCellsBatchingPeriod={20} // Increase time between renders
              windowSize={20} // Reduce the window size
              renderItem={({ item, index }) => (
                <View style={styles.listContainer}>
                  <View style={styles.innerListContainer}>
                    {item && item?.logoUrl && (item?.logoUrl.includes('.svg')) ?
                      <SvgRenderer url={item?.logoUrl} sportFlag={true} width={47} height={47} />
                      :
                      <View style={styles.listInnerContainer}>
                      <View style={styles.listBackground} />
                      <View style={styles.imageContainer}>
                        <ImageWithPlaceHolder
                          source={item?.node?.logoUrl}
                          placeholderSource={Constants.placeholder_trophy_icon}
                          style={styles.imageRightsIcon}
                          logoUrl={true}
                          widthLogo={48}
                          heightLogo={48}
                          resizeMode="contain"
                        />
                      </View>
                    </View>}
                    <View style={styles.list2Container}>
                    <View style={styles.userNameContainer}>
                      <Text style={styles.titleTxt} numberOfLines={2}>{item?.name || item?.title}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleSelect(item?.name)}
                      style={[
                        styles.uncheckBox,
                        {
                          borderColor: checkIfFavorite(item?.name)
                            ? Colors.darkOrange
                            : Colors.white,
                        },
                      ]}>
                      {checkIfFavorite(item?.name) && (
                        <Image source={Images.Tick} style={styles.tickImage} />
                      )}
                    </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
