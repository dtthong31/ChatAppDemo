import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)

import { withAuthenticator } from 'aws-amplify-react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';

import { getUser } from "./src/graphql/queries"
import { createUser } from './src/graphql/mutations';

const randomImage = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwCZE-3NGtzDSPHzbwo_9FyPvfkCwAVWbW6Q&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM-P-QgnxBA38dF20HP9434f6AQcySJn1C1g&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqekwL2LW2-NBO_FE2f2IjZQnp_1xl-shGcg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSwese3WMdVTlYe-5ZjU5S8L_gJXpTUKZa5g&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzvXU8X7h_4qUoIGswIZf4fECxXyii89uog&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIUzIUHLU0tglzHCraRz5NAa6C8Bw_-pth0cR2Cf7PRPT6Z_d7PkZYjl1S1gKX0K8NCp0&usqp=CAU",
]
function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const getRandomImages = () => {
    return randomImage[Math.floor(Math.random() * randomImage.length)];
  }
  useEffect(() => {
    const syncUser = async () => {
      // get Authenticated user from auth
      const authUser = await Auth.currentAuthenticatedUser({ bypassCachee: true });
      console.log("Auth: ", authUser);

      // get the user from Backendwith the user id from auth
      const userData = await API.graphql(graphqlOperation(getUser, { id: authUser.attributes.sub }))
      console.log("userData:", userData);
      if (userData.data.getUser) {
        console.log("User already exists in DB");
        return
      }
      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.username,
        status: "I'm using App"
      };
      console.log("newUser", newUser);

      //  if there is no user in db with the id, then create one 
      await API.graphql(graphqlOperation(createUser, { input: newUser }))
    }

    syncUser();
  })


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
export default withAuthenticator(App);