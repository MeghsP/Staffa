import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,Dimensions,TouchableOpacity,Button} from 'react-native';

type Props = {};
export default class HomeScreen extends Component {
 constructor(args) {
   super(args);
   let { width } = Dimensions.get("window");
   this.state = {
      screenWidth: width,
      isUserLoggedIn:false,
    }
 }
 
 render() {
   return (
     <View style={Styles.root}>
        <View style = {Styles.baseStyle1}>
            <Text style = {Styles.splashLogoTextStyle}>Welcome to STAFFA</Text>
        </View>
     </View>
   );
 }
}