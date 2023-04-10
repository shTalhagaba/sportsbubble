import { Images } from "src/utils";
import React from "react";
import {
    View, Modal, Text, TouchableWithoutFeedback, Image
} from "react-native";
import styles from "./styles";

const LiveMatch = ({ setLiveMatchModal, liveMatchModal }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={liveMatchModal}>
            <TouchableWithoutFeedback
                style={styles.mainView}>
                <View style={styles.mainView}>
                    <View style={styles.innerContainer}>
                        <Image source={Images.MatchTeam} style={styles.matchTeam} />
                        <Text style={styles.liveTxt}>LIVE NOW!</Text>
                        <Text style={styles.matchNameTxt}>Women’s World Cup Qualifier</Text>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};
export default LiveMatch;
