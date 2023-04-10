import React from "react";
import {
    View, Modal, Text, TouchableWithoutFeedback
} from "react-native";
import styles from "./styles";

const SingupVeify = ({ setVerifyModal, verifyModal }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={verifyModal}>
            <TouchableWithoutFeedback
                style={styles.mainView}>
                <View style={styles.mainView}>
                    <View style={styles.checkBoxContainer}>
                        <Text style={styles.verifyTxt}>Please check your inbox to verify your account</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};
export default SingupVeify;
