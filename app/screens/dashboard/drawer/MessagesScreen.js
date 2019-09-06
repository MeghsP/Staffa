import React, {Component} from 'react';
import {Text, View,FlatList, TouchableWithoutFeedback} from 'react-native';
import Header from '../../../utils/header';
import {AppConsumer} from '../../../context/AppProvider';

export default class MessagesScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
     users:[],
    }
 }
 
 onBackPress = () => {
  this.context.goBack(this);
 }

 onOptionClick(item){
  console.log("onOptionClick item : " + JSON.stringify(item));
  this.context.moveToScreen(this, item.screen);
}

 render() {
    const platformHeaderProps = {}
    platformHeaderProps['leftItem'] = {
      title: 'Menu',
      icon: require('../../../images/back.png'),
      layout: 'icon',
      onPress: this.onBackPress
    }
   return (
    <AppConsumer>
    {(context) => (
      <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
          <Header title="Profile" {...platformHeaderProps} />
          
      </View>
     )}
     </AppConsumer> 
   );
 }
}