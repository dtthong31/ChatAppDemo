import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from "react-native";
import { User } from "../../types";
import styles from "./style";
import { useNavigation } from '@react-navigation/native';

import {
    API,
    graphqlOperation,
    Auth,
} from "aws-amplify";
import {
    createChatRoom,
    createUserChatRoom
} from '../../src/graphql/mutations';
import { getCommonChatRoomWithUser } from '../../screens/services/chatRoomService';

export type ContactListItemProps = {
    user: User;
}

const ContactListItem = (props: ContactListItemProps) => {
    const { user } = props;

    const navigation = useNavigation();

    const onClick = async () => {
        console.log("onPress");
        const existingChatRoom = await getCommonChatRoomWithUser(user.id);
        if (existingChatRoom) {
            console.log("existingChatRoom", existingChatRoom.chatRoom.id);
            navigation.navigate("ChatRoomScreen", { id: existingChatRoom.chatRoom.id, name: user.name });
            return;
        }
        //  1. Create a new Chat Room
        const newChatRoomData = await API.graphql(
            graphqlOperation(createChatRoom, { input: {} })
        );
        console.log("Create success chatRomm", newChatRoomData);
        if (!newChatRoomData.data?.createChatRoom) {
            console.log("Error creating the chat error");
        }
        const newChatRoom = newChatRoomData.data?.createChatRoom;

        // Add the clicked user to the ChatRoom
        await API.graphql(
            graphqlOperation(createUserChatRoom, {
                input: { chatRoomID: newChatRoom.id, userID: user.id },
            })
        );

        // Add the auth user to the ChatRoom
        const authUser = await Auth.currentAuthenticatedUser();
        await API.graphql(
            graphqlOperation(createUserChatRoom, {
                input: { chatRoomID: newChatRoom.id, userID: authUser.attributes.sub },
            })
        );

        // navigate to the newly created ChatRoom
        navigation.navigate('ChatRoomScreen', {
            id: newChatRoom.id,
            name: user.name,
        })
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.lefContainer}>
                    <Image source={{ uri: user.image ? user.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" }} style={styles.avatar} />

                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text numberOfLines={2} style={styles.status}>{user.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default ContactListItem;