//import React from "react";
//import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
/*
import { Badge, Card } from "react-native-elements";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Navigation } from "@react-navigation/native";
import { StackNavigator } from "react-navigation";

import React, { Component, Fragment } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
//import styles from "./scanStyle";
import { TouchableOpacity, Text, StatusBar, Linking, View } from "react-native";

import { Header, Colors } from "react-native/Libraries/NewAppScreen";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: false,
      ScanResult: false,
      result: null,
    };
  }

  onSuccess = (e) => {
    const check = e.data.substring(0, 4);
    console.log("scanned data" + check);
    this.setState({
      result: e,
      scan: false,
      ScanResult: true,
    });
    if (check === "http") {
      Linking.openURL(e.data).catch((err) =>
        console.error("An error occured", err)
      );
    } else {
      this.setState({
        result: e,
        scan: false,
        ScanResult: true,
      });
    }
  };

  activeQR = () => {
    this.setState({
      scan: true,
    });
  };
  scanAgain = () => {
    this.setState({
      scan: true,
      ScanResult: false,
    });
  };
  render() {
    const { scan, ScanResult, result } = this.state;
    const desccription =
      "QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed in 1994 for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached. In practice, QR codes often contain data for a locator, identifier, or tracker that points to a website or application. A QR code uses four standardized encoding modes (numeric, alphanumeric, byte/binary, and kanji) to store data efficiently; extensions may also be used.";
    return (
      <View style={styles.scrollViewStyle}>
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <Text style={styles.textTitle}>
            Welcome To React-Native QR Code Tutorial !
          </Text>
          {!scan && !ScanResult && (
            <View style={styles.cardView}>
              <Text numberOfLines={8} style={styles.descText}>
                {desccription}
              </Text>

              <TouchableOpacity
                onPress={this.activeQR}
                style={styles.buttonTouchable}
              >
                <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
              </TouchableOpacity>
            </View>
          )}

          {ScanResult && (
            <Fragment>
              <Text style={styles.textTitle1}>Result !</Text>
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type : {result.type}</Text>
                <Text>Result : {result.data}</Text>
                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                <TouchableOpacity
                  onPress={this.scanAgain}
                  style={styles.buttonTouchable}
                >
                  <Text style={styles.buttonTextStyle}>
                    Click to Scan again!
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}

          {scan && (
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={(node) => {
                this.scanner = node;
              }}
              onRead={this.onSuccess}
              topContent={
                <Text style={styles.centerText}>
                  Go to{" "}
                  <Text style={styles.textBold}>
                    wikipedia.org/wiki/QR_code
                  </Text>{" "}
                  on your computer and scan the QR code to test.
                </Text>
              }
              bottomContent={
                <View>
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => this.scanner.reactivate()}
                  >
                    <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => this.setState({ scan: false })}
                  >
                    <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          )}
        </Fragment>
      </View>
    );
  }
}
const styles = {
  scrollViewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#99003d",
  },

  textTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    padding: 16,
    color: "white",
  },
  textTitle1: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    padding: 16,
    color: "black",
  },
  cardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: "white",
  },
  scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: "white",
  },
  buttonScan: {
    width: 42,
  },
  descText: {
    padding: 16,
    textAlign: "justify",
    fontSize: 16,
  },

  highlight: {
    fontWeight: "700",
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonTouchable: {
    fontSize: 21,
    backgroundColor: "#ff0066",
    marginTop: 32,

    width: deviceWidth - 62,
    justifyContent: "center",
    alignItems: "center",
    height: 44,
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
  },
};
export default City;
*/
/*
import React from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { Badge, Card } from "react-native-elements";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Navigation } from "@react-navigation/native";
import { StackNavigator } from "react-navigation";

const City = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <ScrollView>
        <Card>
          <Text>hi</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default City;
*/
"use strict";
import React, { useState, useEffect, Component, Fragment } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {useNavigation} from "@react-navigation/native";

const Scanner = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with data ${data} has been scanned!`);
    navigation.navigate("ConfirmationPage", { data_string: `${data}`})
    //console.log(type)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};
export default Scanner;
