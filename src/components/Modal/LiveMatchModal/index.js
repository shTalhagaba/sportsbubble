import {Images, Strings} from 'src/utils';
import React from 'react';
import {View, Modal, Text, TouchableWithoutFeedback, Image} from 'react-native';
import styles from './styles';

const LiveMatch = ({setLiveMatchModal, liveMatchModal}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={liveMatchModal}>
      <TouchableWithoutFeedback style={styles.mainView}>
        <View style={styles.mainView}>
          <View style={styles.innerContainer}>
            <Image source={Images.MatchTeam} style={styles.matchTeam} />
            <Text style={styles.liveTxt}>{Strings.liveNow}</Text>
            <Text style={styles.matchNameTxt}>{Strings.womenWorld}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LiveMatch;
