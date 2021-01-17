import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ConfirmCancelButtons from '../../components/ConfirmCancelButtons'
import userContext from '../../context/UserContext';
import { Button } from "react-native-elements";
import { firebase } from '../../firebase';


const ConfirmationPage = ({navigation, route}) => {

    const user = useContext(userContext);
    const { data_string } = route.params
    const {list} = route.params
    //console.log("list", list[0])
    const [rid, rname, location] = data_string.split(' !@#$% ')

    const onConfirm = () => {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
      const orderRef = firebase.firestore().collection('orders').add({
        rid: rid,
        rname: rname,
        location: location,
        createdAt: timestamp,
        status: 'new',
        orderedBy: user.id,
        orderedByName: user.name,
        order: list,
        readyAt: null,
      }).then((docRef) => {
        navigation.navigate('StatusPage', { location: location, orderid: docRef.id, list:list })
        docRef.update({
          id: docRef.id
        })
      })
    }
    return (
      <View style = {{flex: 1}}>
          <View style = {{flex: 1}}>
            <Text style = {styles.confirmText}>
              Hi {user.name} {'\n\n\n'}
              </Text>
              <Text style = {styles.confirmText}>
                Please choose your menu from here! 
              </Text>
              
              <Button
                title="Menu"
                onPress={() => {navigation.navigate("ConfirmMenu", {DId:`${rid}`})}}

              />

          </View>
        
          <View style={{flex:2}}>
            <Text style={{fontSize:20}}>
              Your order: 
              
              {list}
            </Text>
          </View>
          <View style={{flex:1}}>
              <Text style = {styles.confirmText}>

              Would you like to inform {rname} that you are ready to pick up your order?
            </Text>
            
             
            <ConfirmCancelButtons
                buttonStyle = {styles.buttons}
                onPressConfirm = {() => onConfirm()}
                onPressCancel = {() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Homepage' }],
                  })}
            />
            </View>
      </View>
    );
  };

const StatusPage = ({navigation, route}) => {
  const {list} = route.params;
  const user = useContext(userContext);
  const [order, setOrder] = useState([])
  const { location, orderid } = route.params;
  console.log(location, orderid)
  const orderRef = firebase.firestore().collection('orders').doc(orderid)

  useEffect(() => {
    orderRef
        .onSnapshot(
            querySnapshot => {
              const data = querySnapshot.data()
              setOrder(data)
          },
          error => {
              console.log(error)
          }
        )
  }, [])

  const toTime = (readyAt) => {
    const timeReady = readyAt.toDate()
    return (timeReady.getHours().toString() + ':' + timeReady.getMinutes().toString())
  }

  console.log(order.readyAt)

  return (
    <View style = {{justifyContent: 'center', alignContent: 'center', paddingLeft: 15}}>
        <Text style = {{fontWeight: 'bold', fontSize: 20, paddingTop: 20}}>
            Welcome {user.name}! {'\n\n'} Your order has been received:{'\n\n\n'}
        </Text>

        <Text style = {{fontSize: 16}}>
            Your order will be ready at: {'\n'}
        </Text>
        <Button
            title = {order.readyAt ? toTime(order.readyAt) : 'Please wait as we accept your order'}
            style = {{width: 380}}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    confirmText: {
        flex: 2,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttons: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export {StatusPage, ConfirmationPage};