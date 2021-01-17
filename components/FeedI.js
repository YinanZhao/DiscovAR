import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, Button, FlatList, TouchableHighlight, TouchableOpacity, ActivityIndicator} from 'react-native';
import {firebaseConfig, firebase} from '../firebase';
import 'firebase/firestore';
import 'firebase/app';
import { useNavigation } from "@react-navigation/native";
import userContext from '../context/UserContext';
import { Card, Badge, Image } from "react-native-elements";

// import { firebase } from '../firebase';
//const navigation = useNavigation();

const Feed = () => {
    const navigation = useNavigation();
    const [infoRT, setInfoRT] = useState([]);
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }else{
        firebase.app();
    }

    const dbh = firebase.firestore();
    const [errorMessage,setErrorMessage] = useState("");
    const getDocID = async () =>{
        let i =0;
        let list = [];
        try {
            await dbh.collection('users').where("type", "==", "Restaurant")
            .get()
            .then(function(querySnapshot) {
              
                querySnapshot.forEach(function(doc){
                  
                    i += 1;
                    list.push({id: `${i}`, docId: `${doc.id}`,name: `${doc.data().name}`, location: ''});
                });
            });
         } catch (e) {
          //    console.log("it is a wrong place");
                setErrorMessage(
                  "Cannot get Collected List"
                );
            }
        console.log("list = ",list);
        setInfoRT(list);
    }
    useEffect(() => {
        getDocID();
      }, []);
     
    const Display = infoRT.map(item =>
        <TouchableOpacity onPress = {() => 
          navigation.navigate("Restaurant", {ID:`${item.id}`, name:`${item.name}`, DocId:`${item.docId}`, location:""})}
        >
          <View style={styles.button}>
            <Text style={styles.text}> {item.id} {item.name} </Text>
          </View>
        </TouchableOpacity>
    );
   
    const user = useContext(userContext);

    const [orders, setOrders] = useState([])
    const ordersRef = firebase.firestore().collection('orders')
    
    useEffect(() => {
      ordersRef
        .where('orderedBy', '==', user.id)
        .orderBy('createdAt', 'desc')
        .onSnapshot(
          querySnapshot => {
            const newOrders = []
            querySnapshot.forEach(doc => {
              const order = doc.data()
              newOrders.push(order)
            });
            setOrders(newOrders)
          },
          error => {
              console.log(error)
        }
      )
    }, [])

    return (
      <SafeAreaView style={styles.feed}>
        <View style={styles.feedBlock}>
          <TouchableOpacity onPress = {() => navigation.navigate('StatusPage', {location: orders[0].location, orderid: orders[0].id})}>
            <Image
              source={require('../assets/IOrders.png')}
              PlaceholderContent={<ActivityIndicator/>}
              style = {styles.cardImage}
            >
              <Text style={styles.paragraph}> Your Previous Order </Text>
            </Image>
          </TouchableOpacity>
        </View>
        
        <View  style={styles.container}>
            {Display}
        </View>
      </SafeAreaView>
    );
  }

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
    justifyContent: 'center', 
    backgroundColor: 'rgba(250, 250, 250, 0.45)',
    borderWidth: 1,
    borderColor: 'rgb(206, 199, 201)'
  },
  container:{
      flex: 10,
      justifyContent:'center',
      paddingHorizontal: 10
  },
  button:{
      alignItems: "center",
      //backgroundColor: "#DDDDDD",
      padding: 10,
      //paddingHorizontal: 10
  },
  text: {
    fontFamily: "Cochin",
    fontSize: 20,
    fontWeight: "bold",
    //borderBottomColor:"black",
    borderWidth:2,
    borderColor:'grey',
  }
});

export default Feed;