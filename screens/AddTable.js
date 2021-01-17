import React, {useContext, useState, useEffect} from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList, TextInput, Keyboard, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import userContext from '../context/UserContext'
import { firebase } from '../firebase'

const AddTable = ({navigation}) => {
  const user = useContext(userContext);
  const [locations, setLocations] = useState([])
  const [titleText, setTitleText] = useState('')

  //const [descriptionText, setDescriptionText] = useState('')
  const locationsRef = firebase.firestore().collection('users').doc(user.id).collection('Location')
  //const [QRlocations, setQRlocations] = useState([])
  const [places, setPlaces] = useState([])
 
  useEffect(() => {
   
    locationsRef
        .onSnapshot(
            querySnapshot => {
              const totalNames=[];
              const newLocations = [] //this is a list of "entities"
                querySnapshot.forEach(doc => { //for each document in the query
                  for(const [key, value] of Object.entries(doc.data())){
                    if( `${key}` === "location"){
                      newLocations.push(value);
                      totalNames.push(value);
                    }
                  }    
                });
                setLocations(newLocations) //so that I can use it later, use State
                //console.log("AddTable totalName******* ", totalNames)
            },
            error => {
                console.log(error)
            }
        )
       
  }, [])

  const addToLocations = () => {
    console.log("AddTable length = ", titleText.length);
    if (titleText.length > 0) { //entityText so that we don't append string with spaces
      console.log("AddTable location----- ", locations)
      if (locations.indexOf(titleText) > -1){
        alert('This QR code title already exists! Please choose a new title for it.')
      }
      else{
        locationsRef
          .add({})
          .then(function(DocRef){
            DocRef.update({id:DocRef.id, location:titleText})
            setTitleText('')
            //setLocation(doc.id)
            //console.log("uid      ", _doc.id)
            Keyboard.dismiss()
            alert('Added!')
            navigation.navigate('CreateQRcode')
          })
          .catch((error) => {
            alert(error)
          });
      }
    }
    else {
      alert('Please provide a title for this QR code.')
    }
}

  return (
    <View>

      <TextInput
        style={{padding: 20}}
        placeholder='Title'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setTitleText(text)}
        value={titleText}
        // underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <Button
        title = 'Add QR code'
        onPress = {addToLocations}
      />
    </View>
  );
}

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
});

export default AddTable;