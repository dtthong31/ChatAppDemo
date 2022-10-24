import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import React, { useEffect, useState } from 'react';
import { Auth } from "aws-amplify";
export type ChatRoomItem = {
    chatRoom: ChatRoom
}

const ChatListItem = (props: ChatRoomItem) => {
    const { chatRoom } = props;
    const [otherUser, setOtherUser] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        const getOtherUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            if (chatRoom?.users.items[0]?.user.id === userInfo.attributes.sub) {
                setOtherUser(chatRoom?.users.items[1]?.user);
            } else {
                setOtherUser(chatRoom?.users.items[0]?.user);
            }
        }
        getOtherUser();
    }, [])

    const onPressButton = () => {
        navigation.navigate('ChatRoomScreen', {
            id: chatRoom.id,
            name: otherUser.name,
        })
    }

    if (!otherUser) {
        return null;
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPressButton}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: otherUser.image }} style={styles.avatar} />
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{otherUser.name}</Text>
                    <Text
                        numberOfLines={2}
                        style={styles.lastName}>
                        {chatRoom.lastMessage
                            ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`
                            : ""}
                    </Text>
                </View>
            </View>
            <Text style={styles.time}>{chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}</Text>
        </TouchableOpacity>
    )
};
export default ChatListItem;