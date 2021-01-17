import React, { Component, Fragment, useState } from 'react'
import { Text, SafeAreaView, View, StyleSheet,Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {Input} from 'react-native-elements'
import { firebase } from '../../firebase';
import { string } from 'prop-types';

const ForgetPw =({navigation})=>{

    forgotPassword = (Email) => {
        firebase.auth().sendPasswordResetEmail(Email)
          .then(function (user) {
            alert('Please check your email.')
            navigation.navigate('Login')
          }).catch(function (e) {
            console.log(e)
            alert('Invalid email.')
          })
    }


    const [email, setEmail] = useState('');
    return(
        <View>
        <View>
            <Text style={styles.text}>
                Enter your email address:
            </Text>
        </View>
        <View>
        <Input
            placeholder = 'Email'
            autoCapitalize = 'none'
            onChangeText ={(text) =>setEmail(text)}
        />
        </View>
        <Button
            title='Send Email'
            onPress={() => forgotPassword(email)}

        
        />
        </View>
    )

}
const styles = StyleSheet.create({
    text: {
        margin:10,
        fontSize: 25,
},
})
export default ForgetPw;