import {Images, Strings} from 'src/utils';
import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import BlackClose from 'src/assets/images/BlackClose.js';
import GreenButton from 'src/components/GreenButton';

const LiveMatch = ({setLiveMatchModal, liveMatchModal}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={liveMatchModal}>
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
            <Text style={styles.matchNameTxt}>{Strings.womenQualifir}</Text>
            <View style={styles.logoContainer}>
            <Image source={Images.Twitch_logo_2019} style={styles.logoImage} />
            <Image source={Images.ESPN_Plus} style={styles.logoImage} />
            <Image source={Images.FuboTV_logo} style={styles.logoImage} />
            </View>
            <GreenButton
              title={Strings.connecttoWatch}
              rightIcon={false}
              onpress={() =>{}}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default LiveMatch;
