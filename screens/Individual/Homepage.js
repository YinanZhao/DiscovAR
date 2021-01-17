import React, { useState, useContext } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import Feed from "../../components/FeedI";
import Scanner from "../Scanner";
import StatusPageStack from "./StatusPage";
import { useNavigation } from "@react-navigation/native";
import userContext from '../../context/UserContext';
import { ConfirmationPage, StatusPage } from "./StatusPage";
import Amenu from "../Amenu";
import {firebase} from '../../firebase'
import Restaurant from "./Restaurant";
import Menu from "./Menu";
import ConfirmMenu from "./ConfirmMenu";
import AR from "./AR";

const Homepage = ({navigation}) => {
  const user = useContext(userContext);
  return (
    <View style={styles.homePage}>
      <View style = {{flex: 10}}>
        <Feed/>
      </View>
      <View style = {{flex: 1}}>
        <Button
          title="Sign out"
          onPress={() => {
            firebase.auth().signOut();
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            });
          }} 
          color = '#8f35aa'
        />
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

const HomeStackPageI = ({navigation}) => {
  // const navigation = useNavigation(); 
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={Homepage}
        options={{
          headerTitleAlign: "left",
          headerTitle: "DiscovAR",
          title: "Title",
          headerTintColor: "#8f35aa",

          headerRight: () => (
            <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
              <Button onPress={() => navigation.navigate("Scanner")} title="Scan" />
        
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{ headerTitleAlign: "middle", headerTitle: "Scanner" }}
      />
      <Stack.Screen
        name="ConfirmationPage"
        component={ConfirmationPage}
        options={{ headerTitleAlign: "middle", headerTitle: "Confirm your order" }}
      />
      <Stack.Screen
        name="StatusPage"
        component={StatusPage}
        options={{ 
          headerTitleAlign: "middle", 
          headerTitle: "Details", 
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              label = 'Discover'
              onPress = {() => {navigation.reset({
                index: 0,
                routes: [{ name: 'Homepage' }],
              });}}
            />
          ),
      }}
      />
      <Stack.Screen
        name="Restaurant"
        component={Restaurant}
        options={{ headerTitleAlign: "middle", headerTitle: "Restaurant" }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerTitleAlign: "middle", headerTitle: "Menu" }}
      />
      <Stack.Screen
        name="ConfirmMenu"
        component={ConfirmMenu}
        options={{ headerTitleAlign: "middle", headerTitle: "Confirm Menu" }}
      />
      <Stack.Screen
        name="AR"
        component={AR}
        options={{ headerTitleAlign: "middle", headerTitle: "AR" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    flexDirection: "column",
  },
});

export default HomeStackPageI;
