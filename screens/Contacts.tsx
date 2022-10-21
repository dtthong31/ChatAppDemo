import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Text, View } from '../components/Themed';
import ContactListItem from '../components/ContactListItem';

import { listUsers } from '../src/graphql/queries';
import { useEffect, useState } from "react";

export default function ContactsScreen() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        API.graphql(graphqlOperation(listUsers)).then((result) => {
            setUsers(result.data.listUsers.items);
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>List contact</Text>
            <FlatList
                style={{ width: '100%' }}
                data={users}
                renderItem={({ item }) => <ContactListItem user={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});