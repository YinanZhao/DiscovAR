import React, {useState} from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Input, Divider, Button, Icon } from 'react-native-elements';
import { firebase } from '../../firebase';

const LoginScreen = ( {navigation} ) => {
    //const image = { source: "../../assets/loginPic.jpg" };
    const [username, setUsername] = useState('') //This is for username when changing. Later, I need to: https://stackoverflow.com/questions/32913338/react-native-get-textinput-value
    const [password, setPassword] = useState('') //same but password
    
    const onLogIn = () => {
        firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then((response) => {
            const uid = response.user.uid
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return;
                    }
                    const user = firestoreDocument.data()
                    navigation.navigate('Homepage')
                })
                .catch(error => {
                    alert(error)
                });
        })
        .catch(error => {
            alert(error)
        })
        }
    
    return (
        //<KeyboardAvoidingView>
        //<View style = {styles.big}>
            <ImageBackground  
            source={require('../../assets/loginPic.jpg')} 
            style={styles.image}>
            <View style = {{flex: 10}}> 
                {/* <Icon 
                    style = {{alignItems: 'flex-end', paddingTop: 40, paddingRight: 15}} 
                    size = {33} 
                    type = "ionicon" 
                    name = "md-close" 
                    color = "black" 
                    onPress = {() => navigation.navigate("Homepage")}/> */}
            </View>
            
            <View style = {{flex: 30}}>

                <Text style = {styles.text}>
                    DiscovAR
                </Text>
                <Input
                    placeholder = 'Email'
                    placeholderTextColor='#2A88E6'
                    //placeholder = {styles.textInside}
                    inputContainerStyle = {styles.inputContainer}
                    inputStyle = {styles.inputText}
                    containerStyle = {styles.container}
                    autoCapitalize = 'none'
                    // errorMessage = {valid ? " " : "Please enter a valid email address"}
                    onChangeText ={(text) => setUsername(text)}
                />
                <Input
                    placeholder = 'Password'
                    placeholderTextColor='#2A88E6'
                    inputContainerStyle = {styles.inputContainer}
                    inputStyle = {styles.inputText}
                    autoCapitalize = 'none'
                    secureTextEntry = {true}
                    onChangeText = {(text) => setPassword(text)}
                />
                
                <Text style = {styles.forgotPassword} onPress = {() => navigation.navigate("ForgetPw")}> {/*to change later*/}
                    Forgot password?
                </Text>
              

                <Button
                    title = "Log in"
                    titleStyle = {{fontSize: 20}}
                    buttonStyle = {styles.button}
                    onPress = {() => onLogIn()}
                />

                <View style = {{flexDirection: 'row', paddingTop: 10}}>
                    <Divider style = {{flex: 5, marginTop: 8}}/>
                    <Text style = {{flex: 2, textAlign: 'center', color: 'grey'}}>
                        OR
                    </Text>
                    <Divider style = {{flex: 5, marginTop: 8}}/>
                </View>

                <Button
                    title = "Sign up as an Individual"
                    titleStyle = {{fontSize: 16}}
                    buttonStyle = {styles.button}
                    onPress = {() => navigation.navigate('SignUpIndividual')}
                />

                <Button
                    title = "Sign up as a Restaurant"
                    titleStyle = {{fontSize: 16}}
                    buttonStyle = {styles.button}
                    onPress = {() => navigation.navigate('SignUpRestaurant')}
                />

            </View>

            {/* <View style = {{flex: 4}}> 
                <Divider/>
                <Text style = {{marginTop: 25, fontSize: 12, textAlign: 'center'}}>
                    {'Don\'t have an account? '}
                    <Text onPress = {() => navigation.navigate('SignUp')} style = {{fontWeight: 'bold', fontSize: 12, color: 'blue'}}>
                        Sign Up.
                    </Text>
                </Text>
            </View> */}
            </ImageBackground>
        //</View>
        //</KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    big: {
        flex:1,
        backgroundColor:"beige",
        
    },
    text: {
        textAlign: 'center',
        fontSize: 48,
        fontFamily: 'Optima',
        color:"white"
    },
    inputContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
    },
    inputText: {
        color: 'white',
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
        color: '#2A88E6'
    },
    button: {
        margin: 20,
        backgroundColor:'rgba(100, 0, 250, 0.6)',
        borderRadius:20,
        //opacity:0.5
    },
    image: {
        //flex: 1,
        //resizeMode: "cover",
        //justifyContent: "center",
        //width: 100
        width: '100%', height: '100%'
      },
    textInside:{
        color:"white"
    }
});

export default LoginScreen