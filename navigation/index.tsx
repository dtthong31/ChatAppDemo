/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, View } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ChatScreen from '../screens/ChatScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ContactsScreen from '../screens/Contacts'
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { Octicons, MaterialCommunityIcons, Fontisto, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatRoom from '../screens/ChatRoom';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={
      {
        headerStyle: { backgroundColor: Colors.light.tint },
        headerTintColor: Colors.light.background,
      }
    }>
      <Stack.Screen name="Root" component={TopTabNavigator} options={{
        title: "Chat App",
        headerRight: () => (
          <View style={{ flexDirection: 'row', width: 60, justifyContent: 'space-between' }}>
            <Octicons name='search' size={22} color={'white'} />
            <MaterialCommunityIcons name='dots-vertical' size={22} color={'white'} />
          </View>
        ),
      }} />
      <Stack.Screen name="ChatRoomScreen" component={ChatRoom}
        options={(({ route }) => ({
          title: route.params?.name,
          headerRight: () => (
            <View style={{ flexDirection: 'row', width: 100, justifyContent: 'space-between' }}>
              <FontAwesome5 name='video' size={22} color={'white'} />
              <MaterialIcons name='call' size={22} color={'white'} />
              <MaterialCommunityIcons name='dots-vertical' size={22} color={'white'} />
            </View>
          )
        }))} />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const TopTab = createMaterialTopTabNavigator<RootTabParamList>();

function TopTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <TopTab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
        tabBarStyle: { backgroundColor: Colors.light.tint, },
        tabBarIndicatorStyle: { backgroundColor: Colors[colorScheme].background },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        }
      }}>
      <TopTab.Screen
        name="Camera"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => <Fontisto name="camera" color={color} />,
          tabBarLabel: () => null,

        }}
      />
      <TopTab.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          // title: 'Chat',
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <TopTab.Screen
        name="Status"
        component={TabTwoScreen}
        options={{
          // title: 'Chat',
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <TopTab.Screen
        name="Calls"
        component={TabTwoScreen}
        options={{
          // title: 'Chat',
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </TopTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
