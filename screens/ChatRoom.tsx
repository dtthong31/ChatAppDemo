import { useNavigation, useRoute } from '@react-navigation/native'
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ImageBackground, ActivityIndicator } from 'react-native'
import ChatMessage from '../components/ChatMessage';
import InputChat from '../components/InputChat';
import { getChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';

export default function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState(null);

    const route = useRoute();

    const fetchMessages = async () => {
        const messagesData = await API.graphql(
            graphqlOperation(
                getChatRoom, {
                id: route.params.id,
                sortDirection: "DESC",
            }
            )
        )

        console.log("FETCH MESSAGES")
        setMessages(messagesData.data.getChatRoom.Messages.items);
    }
    console.log("messages", messages);

    useEffect(() => {
        fetchMessages();
    }, [])

    useEffect(() => {
        const getMyId = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyId(userInfo.attributes.sub);
        }
        getMyId();
    }, [])

    useEffect(() => {
        const subscription = API.graphql(
            graphqlOperation(onCreateMessage)
        ).subscribe({
            next: (data) => {
                const newMessage = data.value.data.onCreateMessage;
                console.log("newMessage", newMessage);
                console.log("route.params.id",route.params.id);
                
                if (newMessage.chatroomID !== route.params.id) {
                    console.log("Message is in another room!")
                    return;
                }

                fetchMessages();
                // setMessages([newMessage, ...messages]);
            }
        });

        return () => subscription.unsubscribe();
    }, [])

    // console.log(`messages in state: ${messages.length}`)


    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: 'gray' }}>
            <FlatList
                style={{ width: "100%" }}
                data={messages.sort((a, b) => Date.parse(b) - Date.parse(a))}
                renderItem={({ item }) => <ChatMessage myId={myId} messages={item} />}
                inverted
                keyExtractor={(index, item) => `${item}_${index}`}
            />
            <InputChat chatRoomID={route.params} />
        </View>
    )
}
