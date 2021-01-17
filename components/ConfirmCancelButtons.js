import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

const ConfirmCancelButtons = (props) => {
    return (
        <View style = {props.buttonStyle}>
            <Button
                title = 'Confirm'
                buttonStyle = {{backgroundColor: 'green', width: 170}}
                onPress = {props.onPressConfirm}
            />
            <Button
                title = 'Cancel'
                buttonStyle = {{backgroundColor: 'red', width: 170}}
                onPress = {props.onPressCancel}
            />
        </View>
    );
}

export default ConfirmCancelButtons