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
import { getUser } from '../../src/graphql/queries';
export default function ChatScreen({ navigation }: RootTabScreenProps<'Chats'>) {
  console.log("ChatScreen");

  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {

    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      console.log("hongdoan0", authUser.attributes.sub);

      try {
        const responseData = await API.graphql(
          graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
        );
        console.log("return data error ChatScreen", responseData);
        if (responseData.data) {
          setChatRooms(responseData.data.getUser?.ChatRomms.items)
        }
        else {
          console.log("return data error ChatScreen");
          return
        }


      } catch (error) {
        console.log(error);
        if (error.data) {
          // console.log("return data ChatScreen", error.data.getUser.ChatRooms.items);
          setChatRooms(error.data.getUser?.ChatRooms.items)
        }
        else {
          console.log("return data error ChatScreen");

          return
        }
      }
    }
    console.log("Chat room", chatRooms);
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
