import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../../components/ChatListItem';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import NewMessageButton from '../../components/NewMessageButton';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from "react";
import { listChatRooms } from './queries';
export default function ChatScreen({ navigation }: RootTabScreenProps<'Chats'>) {
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {

    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
      );

      console.log("chatRooms", response);
      setChatRooms(response.data.getUser?.ChatRooms.items);
    };

    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
