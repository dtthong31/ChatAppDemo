import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";

export type ChatRoomItem = {
    chatRoom: ChatRoom
}

const ChatListItem = (props: ChatRoomItem) => {
    const { chatRoom } = props;
    const users = chatRoom.users[1];
    const navigation = useNavigation();
    const onPressButton = () => {
        navigation.navigate('ChatRoomScreen', { id: chatRoom.id, name: users.name })
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPressButton}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: users.imageUri }} style={styles.avatar} />
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{users.name}</Text>
                    <Text style={[styles.lastName]} numberOfLines={1}>{chatRoom.lastMessage.content}</Text>
                </View>
            </View>
            <Text style={styles.time}>{moment(chatRoom.lastMessage.createdAt).format('L')}</Text>
        </TouchableOpacity>
    )
};
export default ChatListItem;