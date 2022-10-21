import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { MaterialIcons, Entypo, FontAwesome, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import ChatData from '../../data/Chat'
import { Message } from '../../types';
import moment from 'moment';


export default function InputChat(props: any) {
    const [message, setMessage] = useState<string>();

    const onMicPress = () => {
        console.warn("Micro")
    }

    const onPress = () => {
        if (!message) {
            onMicPress();
        } else {
            let use1: Message = {
                id: `u}`,
                content: message,
                createdAt: `${moment(Date.now()).format('LLL')}`,
                user: {
                    id: 'u1',
                    name: 'Vadim',
                }
            }
            props.onCompleteSend(use1);
            setMessage('');
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <MaterialIcons name="tag-faces" size={24} color="gray" />
                <TextInput
                    value={message}
                    onChangeText={text => setMessage(text)}
                    style={{ marginHorizontal: 10, flex: 1 }}
                    placeholder='Input here'
                    multiline
                />
                <Entypo style={styles.icon} name='attachment' size={24} color={'gray'} />
                <Fontisto name='camera' size={24} color={'gray'} />
            </View>
            <TouchableOpacity style={styles.rightContainer} onPress={onPress}>
                {!message ?
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

