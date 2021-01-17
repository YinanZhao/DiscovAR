'use strict';
 
import React, { Component,useState,useEffect,useContext } from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    FlatList,
    Button,
    TouchableHighlight,
    Separator,
    Alert
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import userContext from '../context/UserContext';
//import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
 
import {firebaseConfig, firebase} from '../firebase';
import 'firebase/firestore';
import 'firebase/app';
//import { TouchableOpacity } from 'react-native-gesture-handler';
//import {Picker, PickerIOS} from '@react-native-picker/picker';
import { Circle } from 'react-native-svg';
//import { Button } from 'react-native-base';
import Swipeout from 'react-native-swipeout';

const CreateQRcode =()=>{

  const navigation = useNavigation();
  const user = useContext(userContext);
  const [selectedIndex, setSelectedIndex] = useState(0); //Initialise restaurant list with setter

  const updateIndex = (index) => {
      setSelectedIndex(index)
     
  }
  const [user2, setUser2] = useState(null)
  const statusRef = firebase.firestore().collection('users').doc(user.id).collection('Location')
  const rName = firebase.firestore().collection('users')
  //console.log("gg",rName)
  //for (let value of Object.entries(rName.data())) {
  //  list5.push(value);
//};
{/*
  const [dbList, setDbList] = useState([]);
  const dbh = firebase.firestore();
  const getDBList = async () => {
        const list = [];
        console.log("Job start from Here");
        try {
            var sfRef = await dbh.collection('users').doc(user.id).collection('Location').get();
           // (await sfRef).forEach(doc => {console.log("document list : \n", doc.id)});
          //  sfRef.forEach(doc => {list.push("<TextInput onChangeText={text => onChangeText(text)} value=" + doc.id + "/>")});
            let i = 0;
            sfRef.forEach(doc => {
            list.push({id: i, name: doc.id});
            i += 1;
            //sfRef.doc(doc.id).get();
        });
          sfRef.forEach(doc => {list.push("<Picker.Item label=" + doc.id + " " + "value=" + doc.id + "/>")});
        /*
        const list2=[];
   
        list.forEach(doc => {
          var sfRef2 = await dbh.collection('users').doc(user.id)
          .collection('Location').doc(`${doc.name}`).get();
         
          list2.push(sfRef2.data());
        });


          console.log("list-----\n", list2);
       
          console.log("list-----\n", list);
            setDbList(list);
        } catch (e) {
        //    console.log("it is a wrong place");
            setErrorMessage(
            "Can not get list"
            );
        }
    };
    useEffect(() => {
         getDBList();
     }, []);
    */}

  //let base64Logo = 'data:image/png;base64,iVBORw0';
  //let aaa=[{name:"Amenu", place:"Ratatouille"}];
    /*
  const state = {
    text: 'R123',
    value: ""
  };
  */
 const [state, setState] = useState({text: " ", value:"",locationID:""});
  //setState({text:item.location, value:''})
  const onPress = ()=> navigation.navigate("StatusPage", {name: state.value, qrid: state.text});
/*
  const content = dbList.map((item) =>
    <Text style={styles.TextStyle}> { item.name } </Text>
  );
*/


//console.log("user2",user2)
//console.log("qwert",state.locationID)
  useEffect(() => {
    statusRef
        .onSnapshot(
            querySnapshot => {
       
                const list3 = []
                querySnapshot.forEach(doc => {
                    const entity = doc.data()
                   
                    list3.push(entity)
                   
                });
                setActive(list3)
            },

            error => {
                console.log(error)
            }
        )
}, [])
useEffect(() => {
  rName
      .onSnapshot(
          querySnapshot => {
     
              const list4 = []
              querySnapshot.forEach(doc => {
               
                  const entity = doc.data()
                  if (user.id=== entity.id){
                  list4.push(entity.id+ " !@#$% " +entity.name)}
                 
              });
              setUser2(list4)
          },

          error => {
              console.log(error)
          }
      )
}, [])
const [docID, setDocID] = useState("")

const changeQR = ({ item }) => {
  setDocID(item.id);
 // console.log("QRCode---hi",docID," CreateQRCode--hello ", item.id )
  return (
   
    <Swipeout right={swipeBtns}
    autoClose={true}
    buttonWidth={110}
    backgroundColor='transparent'>
   
      <View>
      <Text onPress = {() => setState({text:user2 + " !@#$% " + item.location, value: item.location,
      locationID: item.id})} style={styles.title }> {item.location} </Text>
      </View>
   
    </Swipeout>
   
  )
 
}

const swipeBtns = [{
  text: 'Delete',
  backgroundColor: 'red',
  underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
  onPress : () => {deleteNode()}
}];

const deleteNode = () =>{ //await db.collection('users').doc(user.id).collection('Location').doc(`${state.locationID}`).delete();
 // console.log("CRQR---delete -- ", state)
  if(state.locationID.length>0){
  statusRef
    .doc(`${state.locationID}`)
    .delete()
    .catch(function(error){
      console.error("Error removing the doc.")
    });
    setDocID("");
  }
  else{
    alert("Click on one before swiping!");
  }
}
const [Active, setActive] = useState([])
    return (
      <View style={styles.container}>
        <View style={styles.left}>
         
            {/*
            <TouchableOpacity>
            {content}
            </TouchableOpacity>
           
           
           
            <FlatList
            style={styles.list}
            keyExtractor={(item) => item.id}
            data={Active}
            renderItem={changeQR}/>
             
           
            */}
          <FlatList
            style={styles.list}
            keyExtractor={(item) => item.id}
            data={Active}
            renderItem={changeQR}/>
           
  {/*
          <View>
            <View>
              <Text style={styles.list}
              keyExtractor={(item) => item.id}
              data={Active}
              renderItem={changeQR}
            >
            <Swipeout right={swipeBtns}
        autoClose='true'
        backgroundColor= 'transparent'>
   
           
           
            </Swipeout>
            </Text>
            </View>
            <Separator />
          </View>
           
  */}
  <Text data={Active} keyExtractor={(item) => item.id} renderItem={changeQR}> </Text>
         
           

         
       
          <Button 
            style={styles.button2}
            onPress={() => {navigation.navigate("AddTable")}}
            title="Add QR code" >
             <Text style={{textAlign:'center'}}>Add QR code</Text> 
           
           
         
          </Button>
     
        </View>
      <View style={styles.right}>
       
       {/*
        <Text style={styles.input}>
          {/*
          //style={styles.input}
          //onChangeText={(text) => this.setState({text: text})}
          
          { state.text}
        </Text>
          */}
      <TouchableOpacity onPress={onPress}>
        {/* <QRCode
      value={this.state.text}
        /> */}
          <QRCode
          value={state.text.length > 0 ? state.text : ""}
          //value='R123'
          size={150}
          bgColor='#000000'
          fgColor='#FFFFFF'
          //logo={{uri:base64Logo}}
         // logoSize={30}
          //logoBackgroundColor='transparent'
          />
      </TouchableOpacity>
          <Button
            title="Send to email"
          />

       
     
      </View>
      </View>

    );
   
  };

 
const styles = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    margin: 10
},
TextStyle:{
    fontSize: 20,
    textAlign: 'center'
},
button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
},

    container: {
        flexDirection:'row',
        flex: 1,
        //backgroundColor: 'white',
        //alignItems: 'center',
        //justifyContent: 'center'
    },
 
    input: {
        //height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 20,
        borderRadius: 5,
        padding: 5,
        textAlign:'center',
        justifyContent:'center',


    },

    left:{
      //flexDirection: 'row',
      flex:1,
      margin:20,
    },

    right:{
      //flexDirection: 'row',
      flex:1,
      justifyContent:"center"
    },

    button2:{
      borderColor: 'gray',
      borderWidth: 1,
      margin: 20,
      borderRadius: 5,
      padding: 5,
      backgroundColor:'transparent'
    },
    list:{
      padding:10,
           
    },
    title:{
      fontSize:20,
      padding:20,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
    }
});
 
export default CreateQRcode;
//export {CollectionList,CreateQRcode}


/*

import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Share } from 'react-native';

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { connect } from 'react-redux';

import CustomText from '../../../custom/CustomText';
import CustomLayout from '../../../custom/CustomLayout';
import CustomButton from '../../../custom/CustomButton';
import Divider from '../../../custom/Divider';

export const { width, height } = Dimensions.get('window');
import QRCode from 'react-native-qrcode-svg';

import useMenuUrl from '../../../customHooks/createMenuUrl';

import Color from '../../../constants/Color';
import { URL } from '../../../constants/variables';

import { IProvider } from '../../../types/user.types';

import { base64 } from '../../../assets/coffeeBase64';

interface Props {
  user: IProvider;
  closeGenerator: () => void;
}

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height
  },
  text: {
    fontSize: 18,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 10
  },
  text1: {
    fontSize: 16,
    color: Color.tertiary,
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 10
  },
  text2: {
    fontSize: 14,
    color: Color.primary,
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 10
  }
});

const defaultMenuPdf =
  'https://social-coffee-app.s3.eu-west-3.amazonaws.com/SeafoodRestaurentMenu.pdf-user-5f74ab9e75d83c404c5c9cd3-1601631116018.pdf';

const QRcodeScreen: React.FC<Props> = ({ user, closeGenerator }) => {
  const [svg, setSvg] = useState<any>();
  const [urlProvider, setUrlProvider] = useState<string>('');

  const url = useMenuUrl(user);

  useEffect(() => {
    let run: boolean = true;
    if (run) writeMenuUrl();

    () => (run = false);
  }, [urlProvider]);

  url.then((res: any) => setUrlProvider(res));

  const getDataURL = () => {
    svg.toDataURL(callback);
  };

  const callback = (dataURL: any) => {
    let shareImageBase64 = {
      title: 'Your Qr Code',
      message:
        'Here you have your QR Code generated by Social Coffee App! You can save it, share it with your clients or send it to you by email!',
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Here you have your QR Code generated by Social Coffee App' //  for email
    };
    Share.share(shareImageBase64).catch(error => console.log(error));
  };

  const writeMenuUrl = async () => {
    const token = await SecureStore.getItemAsync('jwt');

    const data = { urlProvider };

    try {
      const axiosInstance = await axios.create({
        baseURL: `${URL}/api/v1/provider/writeUrl`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        },
        timeout: 6000
      });

      const response = await axiosInstance({
        method: 'PATCH',
        data
      });

      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <CustomLayout style={styles.layout}>
        <View style={{ marginTop: 20 }}>
          <CustomText type="extra-bold" style={styles.text}>
            Here is your URL:
          </CustomText>
        </View>
        <CustomText type="light" style={styles.text2}>
          At this URL your clients will find the menu you upload on this app any
          time you want!
        </CustomText>
        <CustomText type="extra-bold" style={styles.text1}>
          https://socialcoffeeapp.app/commercial/{urlProvider}
        </CustomText>
        <Divider />
        <CustomText type="extra-bold" style={styles.text}>
          And here is your generated QR Code
        </CustomText>

        <QRCode
          value={
            urlProvider
              ? `https://socialcoffeeapp.app/commercial/${urlProvider}`
              : defaultMenuPdf
          }
          logo={{ uri: base64 }}
          logoSize={30}
          logoBackgroundColor="transparent"
          getRef={c => setSvg(c)}
          size={200}
        />
        <View style={{ marginTop: 20, marginBottom: 30 }}>
          <CustomButton
            buttonWidth="60%"
            name="account-heart-outline"
            size={18}
            color="cyan"
            fontSize={12}
            textType="bold"
            text="Share your Qr Code"
            onPress={getDataURL}
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <CustomButton
            buttonWidth="60%"
            name="close"
            size={18}
            color={Color.secondary}
            fontSize={12}
            textType="bold"
            text="Close"
            onPress={closeGenerator}
          />
        </View>
      </CustomLayout>
    </React.Fragment>
  );
};

const mapStateToProps = ({ user }: any) => ({
  user: user.user
});

export default connect(mapStateToProps)(QRcodeScreen);
*/