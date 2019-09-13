import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {AppConsumer} from '../../../../context/AppProvider';
import firebase from 'react-native-firebase';
import Styles from '../../../../utils/res/Styles';

export default class ContactsView extends Component {
 constructor(args) {
   super(args);
   this.state = {
     users:[],
    }
 }

 componentDidMount() {
  this.context.showLoading = true;
  this.ref = firebase.firestore().collection(this.context.utilities.strings.FS_COLLECTION_USERS);
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
}

componentWillUnmount() {
  this.unsubscribe();
}

onCollectionUpdate = (querySnapshot) => {
  var userData =  [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if(this.context.currentUser.uid !== doc.id){
      data.id = doc.id;
      userData.push(data);
    }
  });
  this.setState({users:userData});
  this.context.showLoading = false;
}
 
 renderRow = ({item}) => {
   return (
     <TouchableOpacity style = {Styles.ContactsRowStyle} onPress={() => {this.onItemClick(item)}}>
       <Image source={{uri: item.bio.profilePicURL}} style={Styles.ContactsProfileImageStyle} />
       <Text style={Styles.ContactsUserNameTextStyle}>{item.registerData.firstName + " " + item.registerData.lastName}</Text>
     </TouchableOpacity>
   );
 }

 onItemClick(item) {
  this.context.setChatReceiver(item);
  this.context.moveToScreenPayload(this.props.screen, this.context.utilities.strings.APP_SCREEN_CHAT,{showDialog:true});
 }

 render() {
   return (
    <AppConsumer>
    {(context) => (
      <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
        {this.state.users.length > 0 && 
          <FlatList
            data = {this.state.users}
            renderItem={this.renderRow}
          />
        }
        {this.state.users.length === 0 && 
          <View style = {context.utilities.styles.CenterDataViewStyle}>
            <Text style={context.utilities.styles.NoDataTextStyle}>{context.utilities.strings.msgNoContactsAvailable}</Text>
          </View>
        }
      </View>
     )}
     </AppConsumer> 
   );
 }
}
