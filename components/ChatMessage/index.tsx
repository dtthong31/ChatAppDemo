import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Message } from '../../types'
import styles from './style.message';

type ChatMessageProps = {
    messages: Message,
}

export default function ChatMessage(props: ChatMessageProps) {
    const { messages } = props;
    const [width, setwidth] = useState<number>(0);

    useEffect(() => {
        setwidth(messages.content.length * 3);
    }, [])
    const isMyMessage = () => {
        return messages.user.id === 'u1';
    }
    return (
        <View style={[styles.container, { alignItems: isMyMessage() ? 'flex-end' : 'flex-start', }]}>
            <View style={[
                styles.messageBox,
                {
                    backgroundColor: isMyMessage() ? '#bfb' : 'white',
                    marginLeft: isMyMessage() ? 50 : 0,
                    marginRight: isMyMessage() ? 0 : 50,

                }
            ]}>
                {!isMyMessage() && <Text style={styles.name}>{messages.user.name}</Text>}
                <Text style={[styles.message, { width }]}>{messages.content}</Text>
                <Text style={styles.day}>{moment(messages.createdAt).fromNow()}</Text>
            </View>
        </View>
    )
}
