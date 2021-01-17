import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { ActivityIndicator } from 'react-native';
import { Card, Badge, Button, Image } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { navigation } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

//const navigation = useNavigation();

const Feed = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.feed}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, flexDirection: 'column'}}
        // contentContainerStyle = {{justifyContent: 'center'}}
      >
        {/* <Card
          style={{
            shadowOffset: { width: 50, height: 50 },
            shadowColor: "black",
            shadowOpacity: 1.0,
          }}
          containerStyle = {{height: 150, justifyContent: 'center'}}
        > */}
        <View style = {styles.feedBlock}>
        <TouchableOpacity onPress = {() => navigation.navigate('CreateQRcode')}>
          <Image
              source={require('../assets/RCreate.png')}
              style = {styles.cardImage}
              PlaceholderContent={<ActivityIndicator />}
          >
            <Text
              style={styles.paragraph}
            >
              Create QR Code
            </Text>
          </Image>
          </TouchableOpacity>
        </View>
        {/* </Card> */}
        
        {/* <Card
          style={{
            shadowOffset: { width: 50, height: 50 },
            shadowColor: "black",
            shadowOpacity: 1.0,
          }}
          containerStyle = {{height: 150, justifyContent: 'center'}}
        > */}
        <View style = {styles.feedBlock}>
        <TouchableOpacity onPress = {() => navigation.navigate('ModifyMenu')}>
          <Image
            source={require('../assets/RMenu.png')}
            style = {styles.cardImage}
            PlaceholderContent={<ActivityIndicator />}>
            <Text style = {styles.paragraph}>
                Add to your Menu
            </Text>
          </Image>
          </TouchableOpacity>
        </View>
        {/* </Card> */}

        {/* <Card
          style={{
            shadowOffset: { width: 50, height: 50 },
            shadowColor: "black",
            shadowOpacity: 1.0,
          }}
          containerStyle = {{height: 150, justifyContent: 'center'}}
        > */}
        <View style = {styles.feedBlock}>
          <TouchableOpacity onPress = {() => navigation.navigate('StatusPage')}>
        <Image
            source={require('../assets/RStatus.png')}
            
            style = {styles.cardImage}
            PlaceholderContent={<ActivityIndicator />}>
            <Text style={styles.paragraph}>
                Status
            </Text>
          </Image>
          </TouchableOpacity>
        </View>
        {/* </Card> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  feed: {
    flex: 7,
    alignContent: 'center',
    borderTopColor: '#d4d4d4',
    borderTopWidth: 1,
    backgroundColor: '#f5f5f5',
  },
  feedBlock: {
    flex: 3,
    alignItems: 'center',
    marginBottom: 20
  },
  paragraph: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    color: 'black'
  },
  cardImage: {
    height: 230, 
    width: 380, 
    //flex:1,
    justifyContent: 'center', 
    backgroundColor: 'rgba(250, 250, 250, 0.50)',
    borderWidth: 1,
    borderColor: 'rgb(206, 199, 201)'
  }
});

export default Feed;
