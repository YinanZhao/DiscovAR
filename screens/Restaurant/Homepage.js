import React, { useState, useContext } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../../components/FeedR";
import { ConfirmTimePage, StatusPage, ActiveOrderPage, PastOrderPage } from "./StatusPage";
import CreateQRcode from "../CreateQRcode";
import { useNavigation } from "@react-navigation/native";
import userContext from '../../context/UserContext';
import Amenu from "../Amenu";
import {firebase} from '../../firebase';
import AddTable from "../AddTable";
import ModifyMenu from "./ModifyMenu";


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

const HomeStackPageR = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homepage"
        component={Homepage}
        options={{
          headerTitleAlign: "left",
          headerTitle: "DiscovAR",
          title: "Title",
          headerTintColor: "#8f35aa",
        }}
      />
      <Stack.Screen
          name="StatusPage"
          component={StatusPage}
          options={{ headerTitleAlign: "middle", headerTitle: "Status"}}
      />
        <Stack.Screen
            name="ConfirmTimePage"
            component={ConfirmTimePage}
            options={{ headerTitleAlign: "middle", headerTitle: "Confirm the order" }}
        />
        <Stack.Screen
            name="ActiveOrderPage"
            component={ActiveOrderPage}
            options={{ headerTitleAlign: "middle", headerTitle: "Active Order" }}
        />
        <Stack.Screen
            name="PastOrderPage"
            component={PastOrderPage}
            options={{ headerTitleAlign: "middle", headerTitle: "Past Order" }}
        />
      <Stack.Screen
        name="CreateQRcode"
        component={CreateQRcode}
        options={{ headerTitleAlign: "middle", headerTitle: "Manage QR codes" }}
      />
      <Stack.Screen
        name="Amenu"
        component={Amenu}
        options={{ headerTitleAlign: "middle", headerTitle: "User confirmation page" }}
      />      
      <Stack.Screen
        name="AddTable"
        component={AddTable}
        options={{ headerTitleAlign: "middle", headerTitle: "Add Table" }}
      />
      <Stack.Screen
        name="ModifyMenu"
        component={ModifyMenu}
        options={{ headerTitleAlign: "middle", headerTitle: "Modify Menu" }}
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

export default HomeStackPageR;
