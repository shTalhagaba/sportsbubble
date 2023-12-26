import Toast from "react-native-toast-message";

export const ShowMessage = (msg) => {
    Toast.show({
        type: "message",
        position: "top",
        visibilityTime: 10000, // Set the visibility time in milliseconds (e.g., 4000ms for 4 seconds)
        props: {
            body: msg,
        },
    });
};

export default ShowMessage;
