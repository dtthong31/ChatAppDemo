import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

// import { Amplify } from 'aws-amplify'
// import awsconfig from './src/aws-exports'
// Amplify.configure(awsconfig)

// import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
// import { Auth, API, graphqlOperation } from 'aws-amplify';

// //  Graphql
// import { getTodo } from './queries';
// import { createTodo } from './mutations';

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
  // const getRandomImages = () => {
  //   return randomImage[Math.floor(Math.random() * randomImage.length)];
  // }
  // useEffect(() => {
  //   const fecthUser = async () => {
  //     // get Authenticated user from auth
  //     const userInfo = await Auth.currentAuthenticatedUser({ bypassCachee: true });

  //     // get the user from Backendwith the user id from auth
  //     if (userInfo) {
  //       const userData = await API.graphql(
  //         graphqlOperation(
  //           getTodo,
  //           {
  //             id: userInfo.attributes.sub,
  //           }
  //         )
  //       )
  //       if (userData.data.getTodo) {
  //         console.log("user is already registered in database");
  //         return;

  //       }
  //       console.log(userData);

  //       const newUser = {
  //         id: userInfo.attributes.sub,
  //         name: userInfo.username,
  //         imageUri: getRandomImages(),
  //         status: "Hey, I'm available.",
  //       }

  //       await API.graphql(
  //         graphqlOperation(
  //           createTodo,
  //           {
  //             input: newUser
  //           }
  //         )
  //       )
  //     }
  //     //  if there is no user in db with the id, then create one 
  //   }

  //   fecthUser();
  // })


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
// const signUpConfig = {
//   header: 'My customized Sign up',
//   hideAllDefaults: true,
//   signUpFields: [
//     {
//       lable: "Full name",
//       key: "name",
//       require: true,
//       displayOver: 1,
//       type: "string",
//     },
//     {
//       lable: "Email",
//       key: "email",
//       require: true,
//       displayOver: 2,
//       type: "string",
//     },
//     {
//       lable: "Username",
//       key: "preferred_username",
//       require: true,
//       displayOver: 3,
//       type: "string",
//     },
//     {
//       lable: "Password",
//       key: "password",
//       require: true,
//       displayOver: 4,
//       type: "string",
//     }
//   ]
// }
// const themesCustom = {
//   ...AmplifyTheme,
//   button: {
//     ...AmplifyTheme.button,
//     backgroundColor: 'blue',
//     borderRadius: 10,
//   }
// }
// export default withAuthenticator(App, { signUpConfig, theme: themesCustom });
export default App;