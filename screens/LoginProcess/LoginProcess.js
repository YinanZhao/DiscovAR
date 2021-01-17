import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './Login'
import SignUpScreenIndividual from './SignUpIndividual';
import SignUpRestaurant from './SignUpRestaurant';
import ForgetPw from './ForgetPw';

const Stack = createStackNavigator();

const LoginScreenStack = () => {
    return (
        <Stack.Navigator>         
            <Stack.Screen 
                name = "Login" 
                component = {LoginScreen}
                options = {{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name = "SignUpIndividual"
                component = {SignUpScreenIndividual}
            />
            <Stack.Screen
                name = "SignUpRestaurant"
                component = {SignUpRestaurant}
            />
            <Stack.Screen
                name = "ForgetPw"
                component = {ForgetPw}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 48,
        fontFamily: 'Optima'
    },
    inputContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
    },
    inputText: {
        color: 'black',
        paddingLeft: 15,
        fontSize: 15
    },
    container: {
        paddingTop: 50
    },
    forgotPassword: {
        fontSize: 12,
        textAlign: 'right',
        paddingRight: 12,
        color: 'blue'
    },
    button: {
        margin: 20,
    }
});

export default LoginScreenStack
