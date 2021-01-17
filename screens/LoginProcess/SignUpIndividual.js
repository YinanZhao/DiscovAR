import React, {useState} from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Input, Divider, Button, Icon } from 'react-native-elements';
import { firebase } from '../../firebase';

const SignUpScreenIndividual = ( {navigation} ) => {
    const [fullName, setFullName] = useState('') 
    const [username, setUsername] = useState('') //This is for username when changing. Later, I need to: https://stackoverflow.com/questions/32913338/react-native-get-textinput-value
    const [password, setPassword] = useState('') //same but password
    const [confirmPassword, setConfirmPassword] = useState('') //same but password

    const onSignUp = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(username, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    username: username,
                    type: 'Individual'
                };

                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Homepage', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        })
    }

    return ( 

        //<View style = {{flex: 1}}>
            <KeyboardAvoidingView
            style = {{flex: 1}}
            behavior="padding"
            >

            

                <Text style = {styles.text}>
                    Discover
                </Text>
                <Input
                    placeholder = 'Full Name'
                    inputContainerStyle = {styles.inputContainer}
                    inputStyle = {styles.inputText}
                    containerStyle = {styles.container} // only one that has this for wrong reasons
                    autoCapitalize= 'none'
                    // errorMessage = {valid ? " " : "Please enter a valid email address"}
                    onChangeText ={(text) => setFullName(text)}
                />
                <Input
                    placeholder = 'Email' 
                    inputContainerStyle = {styles.inputContainer}
                    inputStyle = {styles.inputText}
                    autoCapitalize= 'none'
                    // errorMessage = {valid ? " " : "Please enter a valid email address"}
                    onChangeText ={(text) => setUsername(text)}
                />
                <Input
                    placeholder = 'Password'
                    inputContainerStyle = {styles.inputContainer}
                    inputStyle = {styles.inputText}
                    autoCapitalize = 'none'
                    secureTextEntry = {true}
                    onChangeText = {(text) => setPassword(text)}
                />
                <Input
                    placeholder = 'Confirm Password'
                    inputContainerStyle = {styles.inputContainer}
                    inputStyle = {styles.inputText}
                    autoCapitalize = 'none'
                    secureTextEntry = {true}
                    onChangeText = {(text) => setConfirmPassword(text)}
                />

                <Button
                    title = "Sign Up"
                    titleStyle = {{fontSize: 15}}
                    buttonStyle = {styles.button}
                    onPress = {() => onSignUp()}
                />

                {/* <View style = {{flexDirection: 'row', paddingTop: 10}}>
                    <Divider style = {{flex: 5, marginTop: 8}}/>
                    <Text style = {{flex: 2, textAlign: 'center', color: 'grey'}}>
                        OR
                    </Text>
                    <Divider style = {{flex: 5, marginTop: 8}}/>
                </View>
                <Text style = {{padding: 120}}>
                    Google button here or maybe not...
                </Text> */}


            {/* <View style = {{flex: 4}}> 
                <Divider/>
                <Text style = {{marginTop: 25, fontSize: 12, textAlign: 'center'}}>
                    {'Already got an account? '}
                    <Text onPress = {() => navigation.navigate('Login')} style = {{fontWeight: 'bold', fontSize: 12, color: 'blue'}}>
                        Log In
                    </Text>
                </Text>
            </View> */}
            </KeyboardAvoidingView>
        
    );
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 48,
        fontFamily: 'Optima',
        paddingTop: 70,
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

export default SignUpScreenIndividual