import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ImageBackground } from 'react-native'
import ChatMessage from '../components/ChatMessage';
import InputChat from '../components/InputChat';
import Chat from '../data/Chat';
import { Message } from '../types';

export default function ChatRoom() {
    const [message, setMessage] = useState<Message[] | undefined>();
    const route = useRoute();

    useEffect(() => {
        setMessage(Chat.messages);
    }, [])
    const handleAddMessage = (e: Message) => {
        let _listMessage: Message[] | undefined = message;
        _listMessage = [e, ...message];
        setMessage(_listMessage);
        console.log(message);

    }
    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: 'gray' }}>
            <FlatList
                style={{ width: "100%" }}
                data={message}
                renderItem={({ item }) => <ChatMessage messages={item} />}
                inverted
                keyExtractor={(index, item) => `${item}_${index}`}
            />
            <InputChat onCompleteSend={handleAddMessage} />
        </View>
    )
}
