import React, {useState, useEffect} from 'react';
import {ImageBackground, ScrollView, StatusBar, Text, View} from 'react-native';
import styles from './styles';
import {Images, Colors, Strings} from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import {fetchContentFulContent} from 'src/utils/contentful';

export default function About(props) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    async function fetchAboutContent() {
      const about = await fetchContentFulContent('549YiMQUWzYZxR1qpstDYd');
      setContent(about.fields.description.content[0].content[0].value);
    }
    fetchAboutContent();
  }, []);

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
      {/* Header with Logo and back icon  */}
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{tintColor: Colors.orange}}
        SimpleView
      />

      {/* Main tabs  */}
      <View style={styles.mainTabContainer}>
        <Text style={styles.loginTxt}>{Strings.aboutWatchSports}</Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          indicatorStyle={'white'}
          style={{flex: 1, marginVertical: 25}}>
          <View>
            {content && <Text style={styles.contentTxt}>{content}</Text>}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
