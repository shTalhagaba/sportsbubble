import Toast from "react-native-toast-message";

export const ShowMessage = (msg) => {
    Toast.show({
        type: "message",
        position: "top",
        props: {
            body: msg,
        },
    });
};

export default ShowMessage;
