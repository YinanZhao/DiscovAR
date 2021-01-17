import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, Button, Alert} from 'react-native';
import {firebaseConfig, firebase} from '../firebase';
import 'firebase/firestore';
import 'firebase/app';
const Amenu = ({route}) => {
    const name = route.params.name
    const qrid = route.params.qrid
    const [Amenu, setAmenu] = useState([]); //Initialise restaurant list with setter
    const [errorMessage, setErrorMessage] = useState("");
    const [recentlyConfirmed, setrecentlyConfirmed]=useState([]);
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }else{
        firebase.app();
       // console.log("firebase already initialzed");
    }
    
    const dbh = firebase.firestore();
    const putMenu = async () => {
    //    console.log("Let us try put");
        try{
            dbh.collection("Amenu").doc("R123").set({
                ABC:"10",
                ABB:"5.5",
                BBQ:"5.8",
                BBA:"8.8"
            });
        }catch (e){
            setErrorMessage(
                "There's a restaurants, I told you to upload them!"
            );
        }
    };
    
    
    const getMenu = async () => {
        const list = [];
        console.log("Job start from Here");
        try {
            
          //  var snapshot = await dbh.collection('Amenu01').doc('Table03').get();
            var snapshot = await dbh.collection('Amenu').doc(qrid).get();
            if(!snapshot.exists){
           //     console.log('No such document');
            }else{
            //    console.log("test *******", snapshot.data());
                //setAmenu(snapshot.data());
            }
            for (let value of Object.entries(snapshot.data())) {
                list.push(value);
            };
            console.log("Here2", list); 
            setAmenu(list); 
        } catch (e) {
        //    console.log("it is a wrong place");
            setErrorMessage(
            "I told you to upload them!"
            );
          }
    };
    /*
    const recentlyConfirmed = () => {
      
        firebase
            .auth()
            .createUserWithEmailAndPassword(username, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    name: IndividualName,
                    time: time,
                };

                const usersRef = firebase.firestore().collection('recentlyConfirmed')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        Alert.alert('Thank you for ordering! Your order will come out shortly.')
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        })
    }
    */
  //Call when component is rendered
    useEffect(() => {   
        putMenu();
        getMenu();
        recentlyConfirmed();
    }, []);
    
    return (
        <SafeAreaView >
            <View>
                <Text style={styles.top}>
                    TABLE {qrid} 
                </Text>
            </View>
            <View>
                <Text style={styles.middle}>
                    Hi {name}
                </Text>
            </View>
            <View style={styles.middle}>
                <Button
                    title="Confirm"
                    onPress={() => Alert.alert("hi")}
                />
            </View>

            <View>
                <Text style={styles.middle}>
                    {Amenu}
                    {errorMessage}
                </Text>
            </View>
            <View>
                <Text style={styles.bottom}>
                    Ready in :
                    name: ${name}
                    qrid: ${qrid}
                    <Text style={styles.time}>
                        5 
                    </Text>
                    mins
                </Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    top: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 50,
    },
    middle: {
        marginTop: 50,
        //color: 'blue',
        //fontWeight: 'bold',
        fontSize: 40,
    },
    bottom: {
        marginTop:50,
        //fontWeight: 'bold',
        fontSize: 40,
        //color: 'red',
    },
    time:{
        fontStyle:'italic',
    },
  });
export default Amenu;