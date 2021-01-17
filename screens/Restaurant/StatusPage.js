import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TextInput } from "react-native";
import ConfirmCancelButtons from '../../components/ConfirmCancelButtons'
import userContext from '../../context/UserContext';
import { ButtonGroup, Button, Icon, ListItem } from "react-native-elements";
import {firebase} from '../../firebase'
import { Item } from "native-base";


const ConfirmTimePage = ({ route, navigation }) => {

    const [timer, setTimer] = useState(15) 
    const user = useContext(userContext);
    const { name, orderid } = route.params
    console.log(name, orderid)

    const orderRef = firebase.firestore().collection('orders').doc(orderid)

    const readyAt = (timeLeft) => {
        const time = new Date()
        time.setMinutes(time.getMinutes() + timeLeft);
        console.log(time)
        return (time)
    }

    const onConfirm = () => {
        orderRef
            .update({ readyAt: readyAt(timer), status: 'active'})
            .then(navigation.navigate('StatusPage'))
            .catch((error) => {
                alert(error)
        });
    }    

    return (
      <View style = {{flex: 1}}>
            <Text style = {styles.nameText}>
                Order for {name} {"\n\n\n\n"}
                Please notify {name} in how many minutes his order will be ready.
            </Text>
            <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                <Icon
                    name = 'remove-circle-outline'
                    size = {40}
                    onPress = {() => timer >= 5? setTimer(timer - 5): setTimer(0)}
                />
                <TextInput
                    value = {timer.toString()}
                    style = {styles.timer}
                    fontSize = {50}
                    onChangeText = {timer => setTimer(timer)}
                />
                <Icon
                    name = 'add-circle-outline'
                    size = {40}
                    onPress = {() => setTimer(timer + 5)}
                />
            </View>
            <ConfirmCancelButtons
                buttonStyle = {styles.buttons}
                onPressConfirm = {() => onConfirm()}
                onPressCancel = {() => navigation.navigate('StatusPage')}
            />
      </View>
    );
};

const StatusPage = ({navigation}) => {
    const user = useContext(userContext);
    const [selectedIndex, setSelectedIndex] = useState(1); //Initialise restaurant list with setter

    const updateIndex = (index) => {
        setSelectedIndex(index)
        
    }

    const component1 = () => <Text>Past</Text>
    const component2 = () => <Text>New</Text>
    const component3 = () => <Text>Active</Text>

    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]

    const [Active, setActive] = useState([])
    const [Past, setPast] = useState([])
    const [New, setNew] = useState([])
    const tab = [Past, New, Active]

    
    const renderPast = ({ item }) => {
        return (
            <ListItem  
                title = {item.name}
                chevron
                bottomDivider
                onPress = {() => alert(item.name)}
            />        )
    }
    const renderNew = ({ item }) => {
        return (
            <ListItem
                title = {item.orderedByName}
                chevron
                bottomDivider
                onPress = {() => navigation.navigate('ConfirmTimePage', {name: item.orderedByName, orderid: item.id})}
            />
        )
    }
    const renderActive = ({ item }) => {
        // console.log(item.readyAt.toDate().getMinutes()) can be used to get time ykwim
        return (
            <ListItem
                title = {item.orderedByName}
                chevron
                bottomDivider
                onPress = {() => alert(item.orderedByName)}
            />
        )
    }

    const renderItem = [renderPast, renderNew, renderActive]

    const orderRef = firebase.firestore().collection('orders')

    useEffect(() => {
        orderRef
            .where('rid', '==', user.id)
            .orderBy('createdAt', 'desc')
            .limit(10)
            .onSnapshot(
                querySnapshot => {
                    const newPast = []
                    const newNew = []
                    const newActive = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        if (entity.status == 'active') {
                            newActive.push(entity)
                        }
                        else if (entity.status == 'new') {
                            newNew.push(entity)
                        }
                        else {
                            newPast.push(entity)
                        }
                    });
                    setActive(newActive)
                    setNew(newNew)
                    setPast(newPast)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    return (
        <View>
            <ButtonGroup
                onPress={updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 60}} 
            />
            
            <FlatList
                keyExtractor={(item) => item.id}
                data={tab[selectedIndex]}
                renderItem={renderItem[selectedIndex]}
                // removeClippedSubviews={true}
            />
            
        </View>
    );
};


const ActiveOrderPage = ({ route, navigation }) => {
    const user = useContext(userContext);
    const { name, orderid } = route.params
    console.log(name, orderid)

    return (
      <View style = {{flex: 1}}>
            <Text style = {styles.nameText}>
                Order for {name} {"\n\n\n\n"}
                Please notify {name} in how many minutes his order will be ready.
            </Text>
            <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                <Icon
                    name = 'remove-circle-outline'
                    size = {40}
                    onPress = {() => timer >= 5? setTimer(timer - 5): setTimer(0)}
                />
                <TextInput
                    value = {timer.toString()}
                    style = {styles.timer}
                    fontSize = {50}
                    onChangeText = {timer => setTimer(timer)}
                />
                <Icon
                    name = 'add-circle-outline'
                    size = {40}
                    onPress = {() => setTimer(timer + 5)}
                />
            </View>
            <ConfirmCancelButtons
                buttonStyle = {styles.buttons}
                onPressConfirm = {() => onConfirm()}
                onPressCancel = {() => navigation.navigate('StatusPage')}
            />
      </View>
    );
};


const PastOrderPage = ({ route, navigation }) => {

    const user = useContext(userContext);
    const { name, orderid } = route.params
    console.log(name, orderid)

    return (
      <View style = {{flex: 1}}>
            <Text style = {styles.nameText}>
                Order for {name} {"\n\n\n\n"}
                Please notify {name} in how many minutes his order will be ready.
            </Text>
            <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                <Icon
                    name = 'remove-circle-outline'
                    size = {40}
                    onPress = {() => timer >= 5? setTimer(timer - 5): setTimer(0)}
                />
                <TextInput
                    value = {timer.toString()}
                    style = {styles.timer}
                    fontSize = {50}
                    onChangeText = {timer => setTimer(timer)}
                />
                <Icon
                    name = 'add-circle-outline'
                    size = {40}
                    onPress = {() => setTimer(timer + 5)}
                />
            </View>
            <ConfirmCancelButtons
                buttonStyle = {styles.buttons}
                onPressConfirm = {() => onConfirm()}
                onPressCancel = {() => navigation.navigate('StatusPage')}
            />
      </View>
    );
};

const styles = StyleSheet.create({
    nameText: {
        flex: 2,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttons: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    timer: {
        marginBottom: 100,
    }
});

export {StatusPage, ConfirmTimePage, ActiveOrderPage, PastOrderPage};