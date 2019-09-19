import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Header from '../../utils/header';
import {AppConsumer} from '../../context/AppProvider';


export default class HomeScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
    }
 }

 componentDidMount(){
   this.context.setCurrentContext(this);
   if(this.context.openFromNotification){
    this.context.performNotificationAction(this);
   }
 }
 
 toggleDrawer = () => {
  this.context.toggleDrawer(true)
 }
 render() {
    const platformHeaderProps = {}
    platformHeaderProps['leftItem'] = {
      title: 'Menu',
      icon: require('../../images/menu.png'),
      layout: 'icon',
      onPress: this.toggleDrawer
    }
   return (
    <AppConsumer>
    {(context) => (
      <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
          <Header title="Home" {...platformHeaderProps} />
          <View style = {context.utilities.styles.baseStyle1}>
              <Text style = {context.utilities.styles.splashLogoTextStyle}>Welcome to STAFFA</Text>
          </View>
      </View>
     )}
     </AppConsumer> 
   );
 }
}