import React, { useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreenStack from './screens/LoginProcess/LoginProcess';
import HomeStackPageI from './screens/Individual/Homepage';
import HomeStackPageR from './screens/Restaurant/Homepage';
import {firebaseConfig, firebase} from './firebase'
import UserContext from './context/UserContext'

// firebase.initializeApp(firebaseConfig);

const RootStack = createStackNavigator();


export default function App() {
  if (firebase.apps.length == 0) {
    console.log('Connected with Firebase')
    firebase.initializeApp(firebaseConfig);
  }

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => { //because .onAuthStateChanged returns an unsubscriber, it gets run thanks to UseEffect
      if (user) { //unsure why async is not needed
        // setUser(user.providerData)
        console.log('user exists')
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setUser(userData)
            setLoading(false)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setUser({type: 'noUser'})
        console.log('user no exist')
        setLoading(false)
      }
    });
  }, []); //the second argument (an empty array) says to skip update when there's no change
  // "If you want to run an effect and clean it up only once (on mount and unmount), 
  // you can pass an empty array ([]) as a second argument." This tells React that 
  // your effect doesn’t depend on any values from props or state, so it never needs to re-run
  if (loading) { //basically not dealing with the error
    return (
      <></>
    )
  }
  return (
    <UserContext.Provider value = {user}>
      <NavigationContainer>
        {console.log(user.type)}
        {console.log(user)}
        <RootStack.Navigator
          initialRouteName = {user ? 'Homepage' : 'LoginScreen'}
          screenOptions = {{
            headerShown: false
          }}
        >
          <RootStack.Screen
            name = "LoginScreen"
            component = {LoginScreenStack}
          /> 
          <RootStack.Screen
            name = "Homepage"
            component = {user.type == 'noUser' ? LoginScreenStack : user.type == 'Individual' ? HomeStackPageI : HomeStackPageR}
          />
            {/* {props => <TabsTogether {...props} userData={user} />} not like I understood this LOL */}
        </RootStack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
