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

export type ContactListItemProps = {
    user: User;
}

const ContactListItem = (props: ContactListItemProps) => {
    const { user } = props;

    const navigation = useNavigation();

    const onClick = async () => {
        console.log("onPress");

        //  1. Create a new Chat Room
        const newChatRoomData = await API.graphql(
            graphqlOperation(createChatRoom, { input: {} })
        );
        console.log(newChatRoomData);
        // if (!newChatRoomData.data?.createChatRoom) {
        //     console.log("Error creating the chat error");
        // }
        // const newChatRoom = newChatRoomData.data?.createChatRoom;

        // // Add the clicked user to the ChatRoom
        // await API.graphql(
        //     graphqlOperation(createUserChatRoom, {
        //         input: { chatRoomID: newChatRoom.id, userID: user.id },
        //     })
        // );

        // // Add the auth user to the ChatRoom
        // const authUser = await Auth.currentAuthenticatedUser();
        // await API.graphql(
        //     graphqlOperation(createUserChatRoom, {
        //         input: { chatRoomID: newChatRoom.id, userID: authUser.attributes.sub },
        //     })
        // );

        // // navigate to the newly created ChatRoom
        // navigation.navigate("Chat", { id: newChatRoom.id });
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.lefContainer}>
                    <Image source={{ uri: user.image }} style={styles.avatar} />

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