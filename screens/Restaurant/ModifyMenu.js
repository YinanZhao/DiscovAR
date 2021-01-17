import React, {useContext, useState, useEffect} from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList, TextInput, Keyboard, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import userContext from '../../context/UserContext'
import { firebase } from '../../firebase'

const renderDishesEdit = ({ item }) => (
  <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)'>
    <View style={styles.container}>
      {/* <Image style={styles.photo} source={{ uri: item.photo_url }} /> */}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </TouchableHighlight>
);


const ModifyMenu = () => {
  const [dishes, setDishes] = useState([])
  const [titleText, setTitleText] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const user = useContext(userContext);
  const userID = useContext(userContext).id
  const dishesRef = firebase.firestore().collection('users').doc(user.id).collection('menu')

  useEffect(() => {
    dishesRef
        .where("authorID", "==", userID)
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const newDishes = [] //this is a list of "entities"
                querySnapshot.forEach(doc => { //for each document in the query
                    const dish = doc.data()
                    dish.id = doc.id
                    newDishes.push(dish)
                });
                setDishes(newDishes) //so that I can use it later, use State
            },
            error => {
                console.log(error)
            }
        )
  }, [])

  const addToDishes = () => {
    if (titleText.length > 0 && descriptionText.length > 0) { //entityText so that we don't append string with spaces
        const timestamp = firebase.firestore.FieldValue.serverTimestamp(); //get the time
        const data = { //data that will be added to firebase
            title: titleText,
            description: descriptionText,
            authorID: userID,
            createdAt: timestamp,
            // photo_url: photo_url,
        };
        dishesRef
            .add(data)
            .then(_doc => { //convention which says it's a "private" variable
                setTitleText('')
                setDescriptionText('')
                Keyboard.dismiss()
            })
            .catch((error) => {
                alert(error)
            });
    }
    else {
      alert('Please provide title & description for the dish!')
    }
}

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={dishes}
        renderItem={renderDishesEdit}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        style={{padding: 20}}
        placeholder='Title'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setTitleText(text)}
        value={titleText}
        // underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={{padding: 20}}
        placeholder='Description'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setDescriptionText(text)}
        value={descriptionText}
        // underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <Button
        title = 'Add Menu Item'
        onPress = {addToDishes}
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
  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
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
  description: {
    marginTop: 5,
    marginBottom: 5
  }
});

export default ModifyMenu;