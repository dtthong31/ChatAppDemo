import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { MaterialIcons, Entypo, FontAwesome, Fontisto } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../src/graphql/mutations';


const InputChat = ({ chatRoomID }) => {

    const [text, setText] = useState("");

    const onPress = async () => {
        const authUser = await Auth.currentAuthenticatedUser();

        const newMessage = {
            chatroomID: chatRoomID.id,
            text,
            userID: authUser.attributes.sub,
        };

        const newMessageData = await API.graphql(
            graphqlOperation(createMessage, { input: newMessage })
        );

        setText("");

        // set the new message as LastMessage of the ChatRoom
        await API.graphql(
            graphqlOperation(updateChatRoom, {
                input: {
                    _version: chatRoomID._version,
                    chatRoomLasteMessageId: newMessageData.data.createMessage.id,
                    id: chatRoomID.id,
                },
            })
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <MaterialIcons name="tag-faces" size={24} color="gray" />
                <TextInput
                    value={text}
                    onChangeText={text => setText(text)}
                    style={{ marginHorizontal: 10, flex: 1 }}
                    placeholder='Input here'
                    multiline
                />
                <Entypo style={styles.icon} name='attachment' size={24} color={'gray'} />
                <Fontisto name='camera' size={24} color={'gray'} />
            </View>
            <TouchableOpacity style={styles.rightContainer} onPress={onPress}>
                {!text ?
                    <FontAwesome name="microphone" size={24} color="white" />
                    : <MaterialIcons name='send' size={24} color={'white'} />
                }
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: 'row'
    },
    leftContainer: {
        backgroundColor: 'white',
        flex: 1,
        width: '90%',
        borderRadius: 20,
        height: 60,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center'
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "10%",
        height: 60,
        backgroundColor: Colors.light.tint,
        borderRadius: 50
    }, icon: {
        marginHorizontal: 5,
    }
})

export default InputChat;