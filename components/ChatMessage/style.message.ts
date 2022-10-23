import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    messageBox: {
        marginRight: 50,
        backgroundColor: '#e5e5e5',
        borderRadius: 10,
        padding: 10,
    },
    message: {
    },
    name: {
        color: Colors.light.tint,
        fontWeight: 'bold',

    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 50
    },
    day: {
        alignSelf: 'flex-end',
        color: 'gray'

    }
})
export default styles;
