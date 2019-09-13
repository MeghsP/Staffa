import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {AppConsumer} from '../../../../context/AppProvider';
import firebase from 'react-native-firebase';
import Styles from '../../../../utils/res/Styles';
import moment from 'moment';

export default class ChatsView extends Component {
 constructor(args) {
   super(args);
   this.state = {
     users:[],
     isLoading:false
    }
 }

 componentDidMount() {
  // this.context.showLoading = true;
  this.setState({isLoading:true});
  // this.context.showLoading(true);
  var userConversation = firebase.firestore().collection(this.context.utilities.strings.FS_COLLECTION_USER_CONVERSATION);
  var userDoc =  userConversation.doc(this.context.currentUser.uid);  
  var conversation = userDoc.collection(this.context.utilities.strings.FS_COLLECTION_CONVERSATION);
  this.unsubscribe = conversation.onSnapshot(this.onCollectionUpdate)
}

componentWillUnmount() {
  this.unsubscribe();
}

onCollectionUpdate = (querySnapshot) => {
  var screen = this;
  // var context = this.context;
  var userData =  [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    var chatUID = doc.id;
    var senderID = data.senderID;
    console.log("ChatView onCollectionUpdate  senderID : " + senderID);
    console.log("ChatView onCollectionUpdate  chatUID : " + chatUID);
    if(screen.context.currentUser.uid !== doc.id){
      screen.context.apiService.getUserData(senderID, (error, response) => {
        if(!error){
          response.id = senderID;
          userData.push({chatUID: chatUID, singleMessage:{}, user:response});
          // screen.setState({users:userData});
          var chatRef = firebase.firestore().collection(screen.context.utilities.strings.FS_COLLECTION_CONVERSATION).doc(chatUID);
          chatRef.onSnapshot(function (doc) {
            if (doc.exists) {
              var data = doc.data();
              var chatUID = doc.id;
              var currentTopic = data.currentTopic;
              console.log("ChatView onCollectionUpdate  chatUID : " + chatUID);
              console.log("ChatView onCollectionUpdate  currentTopic : " + currentTopic);
              screen.setState({isLoading:false});
              // context.showLoading(false);
              var topicsRef = chatRef.collection(screen.context.utilities.strings.FS_COLLECTION_TOPICS).doc(currentTopic);
              topicsRef.get().then(doc => {
                // screen.context.showLoading(true);
                screen.setState({isLoading:true});
                var singleTopic = doc.data();
                var lastMessageID = singleTopic.lastMessageID;
                console.log("ChatView onCollectionUpdate  lastMessageID : " + lastMessageID);
                var messageRef = topicsRef.collection(screen.context.utilities.strings.FS_COLLECTION_MESSAGES).doc(lastMessageID);
                messageRef.get().then(doc => {
                  var singleMessage = doc.data();
                  console.log("ChatView onCollectionUpdate  singleMessage : " + singleMessage.message);
                  // var users = screen.state.users;
                  userData.map((user) => {
                    console.log("ChatView onCollectionUpdate  user.chatUID : " + user.chatUID +" N " + chatUID);
                    if(user.chatUID === chatUID){
                      console.log("ChatView onCollectionUpdate  user.chatUID 11: " + user.chatUID +" N " + chatUID);
                      user.singleMessage = singleMessage;
                      console.log("ChatView onCollectionUpdate  user.message: " + JSON.stringify(user.singleMessage));
                    }
                  });
                  setTimeout(()=>{
                    screen.setState({users:userData});
                    // screen.context.showLoading(false);
                    screen.setState({isLoading:false});
                    console.log("ChatView onCollectionUpdate  users: " + JSON.stringify(screen.state.users));
                  }, 500);
                  
                }); 
              });             
            }
          });
        }
      });
    }
  });
  this.context.showLoading = false;
}

 
 renderRow = ({item}) => {
   return (
     <TouchableOpacity style = {Styles.ContactsRowStyle} onPress={() => {this.onItemClick(item)}}>
       <Image source={{uri: item.user.bio.profilePicURL}} style={Styles.ContactsProfileImageStyle} />
       <View style={{flex:1}}>
        <Text style={Styles.ContactsUserNameTextStyle}>{item.user.registerData.firstName + " " + item.user.registerData.lastName}</Text>
        {item.singleMessage.message && 
          <View style={{flex:1, flexDirection:'row'}}>
            <Text style={[Styles.ContactsUserNameTextStyle, {flex:1, fontSize:12, color:"#939393"}]}>{item.singleMessage.message}</Text>
            <Text style={[Styles.ContactsUserNameTextStyle, {fontSize:12, color:"#939393"}]}>{moment(item.singleMessage.time).format('DD-MMM-YYYY hh:mm a')}</Text>
            {/* <Text style={[Styles.ContactsUserNameTextStyle, {flex:1, fontSize:12, color:"#939393"}]}>Hello</Text>
            <Text style={[Styles.ContactsUserNameTextStyle, {fontSize:12, color:"#939393"}]}>Time</Text> */}
          </View>
        }
       </View>
     </TouchableOpacity>
   );
 }

 onItemClick(item) {
  this.context.setChatReceiver(item.user);
  this.context.moveToScreenPayload(this.props.screen, this.context.utilities.strings.APP_SCREEN_CHAT,{showDialog:false});
 }

 render() {
   return (
    <AppConsumer>
    {(context) => (
      <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
        {this.state.users.length > 0 && 
          <FlatList
            extraData={this.state.users}
            data = {this.state.users}
            renderItem={this.renderRow}
            keyExtractor  =  {(item, index) => index.toString()}  
          />
        }
        {this.state.users.length === 0 && this.state.isLoading === false  &&
          <View style = {context.utilities.styles.CenterDataViewStyle}>
            <Text style={context.utilities.styles.NoDataTextStyle}>{context.utilities.strings.msgNoChatFound}</Text>
          </View>
        }
      </View>
     )}
     </AppConsumer> 
   );
 }
}
