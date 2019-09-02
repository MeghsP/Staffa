import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {AppConsumer} from '../context/AppProvider'; 

export default class SplashScreen extends Component {
  
 constructor(props) {
   super(props);
 }
 
 componentDidMount(){
  this.timeoutHandle = setTimeout(()=>{
    this.context.replaceScreen(this, this.context.currentScreen);
  }, 2500);
 }

 componentWillUnmount() {
  clearTimeout(this.timeoutHandle);
}

 render() {
   return (
     <AppConsumer>
        {(context) => (
          <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
              <View style = {context.utilities.styles.baseStyle1}>
                  <Text style = {context.utilities.styles.splashLogoTextStyle}>STAFFA</Text>
              </View>
          </View>
        )} 
     </AppConsumer>  
   );
 }
}