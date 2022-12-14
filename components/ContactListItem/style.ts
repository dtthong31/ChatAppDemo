import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        padding: 10,
    },
    lefContainer: {
        flexDirection: 'row',
    },
    midContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 15,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "white"
    },
    status: {
        fontSize: 16,
        color: 'grey',
    },
});

export default styles;