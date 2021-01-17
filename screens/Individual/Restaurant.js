import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button, ImageBackground} from 'react-native';
import { Badge, Card } from "react-native-elements";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
//import { Navigation } from "@react-navigation/native";
import { StackNavigator } from "react-navigation";
import { Navigation, useNavigation } from "@react-navigation/native";


const Restaurant = ({route}) => {
    const navigation = useNavigation();
    const DocId = route.params.DocId;
    const name = route.params.name;
    
    return (
        <SafeAreaView >
            <ImageBackground 
            source={require('../../assets/IRestaurant.png')}
            style={{width: '100%', height: '100%'}}
            >
            <View style={{alignItems:'left' }}>
                <Text style={styles.text}>
                   
                    {name}
                </Text>
                <Button
                    title = 'Menu'
                    onPress={() => {navigation.navigate("Menu", {DId:`${DocId}`})}}
                    
                />
            </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    text:{
        alignContent:'center',
        fontFamily: "Cochin",
        fontSize: 50,
        fontWeight: "bold",
        //borderBottomColor:"black",
        //borderWidth:2,
        //borderColor:'grey',
        padding:10
    }
});

export default Restaurant;