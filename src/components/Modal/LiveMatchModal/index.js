import {Images, Strings} from 'src/utils';
import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './styles';
import BlackClose from 'src/assets/images/BlackClose.js';
import GreenButton from 'src/components/GreenButton';
import {Colors} from 'src/utils';
import { fetchContentFulContent } from 'src/utils/contentful';

const LiveMatch = ({setLiveMatchModal, liveMatchModal}) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    async function fetchPromotionContent () {
      const promotions = await fetchContentFulContent('67NvszQuZ1oltZJb9tNgOw');
      setContent(promotions);
    }

    fetchPromotionContent()
  }, [])

  return (
    <Modal animationType="slide" transparent={true} visible={liveMatchModal}>
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      <TouchableWithoutFeedback style={styles.mainView}>
        <View style={styles.mainView}>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              style={styles.crossImage}
              onPress={() => setLiveMatchModal(!liveMatchModal)}>
              <BlackClose />
            </TouchableOpacity>
            <Image source={Images.MatchTeam} style={styles.matchTeam} />
            <Text style={styles.liveTxt}>{Strings.liveNow}</Text>
            {/* <Text style={styles.matchNameTxt}>{content.fields.event.line2}</Text> */}
            <View style={styles.logoContainer}>
              <Image
                source={Images.Twitch_logo_2019}
                style={styles.logoImage}
              />
              <Image source={Images.ESPN_Plus} style={styles.logoImage} />
              <Image source={Images.FuboTV_logo} style={styles.logoImage} />
            </View>
            <GreenButton
              title={Strings.connecttoWatch}
              rightIcon={false}
              Container={styles.greenButtonContainer}
              btnTxt={styles.greenButtonTxt}
              onpress={() => {}}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LiveMatch;
