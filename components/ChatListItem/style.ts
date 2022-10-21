import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderRadius: 50
    },
    container: {
        // flex: 1,
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        height: 70,
        marginVertical: 2,
        marginHorizontal: 5
    },
    midContainer: {
        justifyContent: 'space-around'
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    lastName: {
        fontSize: 16,
        color: 'gray',
        width: 200
    },
    leftContainer: {
        flexDirection: 'row'
    },
    time: {
        fontSize: 16,
        color: 'gray',
    }
});
export default styles;
