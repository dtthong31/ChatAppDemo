import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { userInfo } from '../../src/graphql/queries';
import { Message } from '../../types';
import { userDefault } from '../../assets/images/userDefault.png';
import styles from './style.message';

type ChatMessageProps = {
    messages: Message,
}

export default function ChatMessage(props: ChatMessageProps) {
    const { messages, myId } = props;
    const [width, setwidth] = useState<number>(0);
    const [infoUserName, setInfoUserName] = useState("")
    useEffect(() => {
        let widthText = messages.text.length * 3;

        setwidth(widthText < 100 ? 80 : widthText);
        const infoUser = async () => {
            const request = await API.graphql(graphqlOperation(userInfo, { id: messages.userID }))
            console.log("request", request);
            setInfoUserName(request.data.getUser)

        }

        infoUser();
    }, [])
    const isMyMessage = () => {
        return messages.userID === myId;
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
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: infoUserName.image ? infoUserName.image : userDefault }} style={styles.avatar} />
                    <View>
                        {!isMyMessage() && <Text style={styles.name}>{infoUserName.name}</Text>}
                        <Text style={[styles.message, { width }]}>{messages.text}</Text>
                        <Text style={styles.day}>{moment(messages.createdAt).fromNow()}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}
