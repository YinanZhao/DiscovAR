import React, { useState, useEffect,useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Button, SafeAreaView } from "react-native";
import { Badge, Card } from "react-native-elements";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Navigation, useNavigation } from "@react-navigation/native";
import { StackNavigator } from "react-navigation";
import {firebaseConfig, firebase} from '../../firebase';
import 'firebase/firestore';
import 'firebase/app';
import userContext from '../../context/UserContext'


const Menu = ({route}) => {
    const navigation = useNavigation();
    //const menuRef = firebase.firestore().collection('users').doc(user.id).collection('menu')
    const user = useContext(userContext);
    const [infoRT, setInfoRT] = useState([]);
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }else{
        firebase.app();
    }

    const dbh = firebase.firestore();
    const [errorMessage,setErrorMessage] = useState("");
    const DocId = route.params.DId;
    console.log("hello DocId ----",route)
    //const DocId = navigation.getParam('DocId');
    //console.log(DocID)
    const getDocID = async () =>{
        let i =0;
        let list = [];
        try {
            await dbh.collection('users').doc(DocId).collection('menu')
            .get()
            .then(function(querySnapshot) {
              
                querySnapshot.forEach(function(doc){
                  
                    i += 1;
                    list.push({id: `${i}`, title: `${doc.data().title}`,description: `${doc.data().description}`, price: ''});
                });
            });
         } catch (e) {
          //    console.log("it is a wrong place");
                setErrorMessage(
                  "Cannot get Collected List"
                );
            }
        //console.log("list = ",list);
        setInfoRT(list);
    }
    useEffect(() => {
        getDocID();
      }, []);
     
    const Display = infoRT.map(item =>
        //<TouchableOpacity onPress = {() => 
        //navigation.navigate("Restaurant", {ID:`${item.id}`, name:`${item.name}`, DocId:`${item.docId}`, location:""})}>
         <View > 
        <Text > {item.id} {item.title} {item.description} </Text>
        </View>
       // </TouchableOpacity>
    );
  return (
      <SafeAreaView style={styles.container}>
    

        <View>{Display}</View>
      
      <ScrollView>
        <Card>
          <Text>hi</Text>
        </Card>
      </ScrollView>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Menu;
