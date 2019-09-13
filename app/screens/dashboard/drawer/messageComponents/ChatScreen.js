import React, {Component} from 'react';
import {Text,TextInput, View, TouchableOpacity,FlatList, Image} from 'react-native';
import {AppConsumer} from '../../../../context/AppProvider';
import DialogInput from 'react-native-dialog-input';
import CustomDialogList from '../../../../customViews/dialog/CustomDialogList';
import firebase from 'react-native-firebase';
import moment from 'moment';

export default class ChatScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
     currentTopic:'',
     topics:null,
     currentMessages:null,
     selectedTopic:null,
     isDialogVisible:false,
     showTopicDialog:false,
     chatUID:'',
     userID:'',
     message:'',
    }
 }

 componentWillMount() {

 }

 componentDidMount() {
    var userID = this.context.currentUser.uid;
    var receiverID = this.context.currentChatReceiver.id;
    var chatUID = this.context.apiService.getChatUID(receiverID, userID);
    this.setState({userID:userID});
    this.setState({chatUID:chatUID});
    this.context.apiService.isConversationExist(chatUID, (error, response) => {
      console.log("ApiService componentDidMount  error : " + error);
      console.log("ApiService componentDidMount response : " + JSON.stringify(response)); 
      if(!error){
        if(response.exist){
          var topic = response.data.currentTopic;
          if(topic.length === 0){
            this.setState({isDialogVisible:true});
          } 
        } else {
          this.context.apiService.setNewConversation(userID, receiverID, chatUID);
          this.setState({isDialogVisible:true});
        }
      } else {
        this.context.showToast(this.context.utilities.strings.msgSomethingWentWrong);
      }
      this.listenForNewTopic();
    });
    
 }

 listenForNewTopic() {
  var screen = this;
  var chatRef = firebase.firestore().collection(this.context.utilities.strings.FS_COLLECTION_CONVERSATION).doc(this.state.chatUID);
  // Listen for change in current selected topic
  this.currentTopicListener =  chatRef.onSnapshot(function (doc) {
    if (doc.exists) {
      var data = doc.data();
      var currentTopic = data.currentTopic;
      console.log("listenForCurrentTopic : " + currentTopic);
      screen.setState({currentTopic:currentTopic});
      screen.setState({messages:[]});
      // if(screen.topics){
      //   screen.topics.map((topic) => {
      //     console.log("listenForCurrentTopic topic name: " + topic.topicName);
      //     if(topic.topicName === currentTopic){
      //       screen.setState({selectedTopic:topic});
      //       console.log("listenForCurrentTopic selectedTopic: " + topic.topicName);
      //     }
      //   });
      // }
      
      screen.listenForNewMessage();
    }
  });

  // Listen if new topic is added
  var topicsRef = chatRef.collection(this.context.utilities.strings.FS_COLLECTION_TOPICS);
  this.topicListener =  topicsRef.onSnapshot(function (querySnapshot) {
    var topics = [];
    var selectedTopic = {};
    querySnapshot.docs.map((doc) => {
      console.log("listenForNewTopic id : " + doc.id); 
      console.log("listenForNewTopic currentTopic : " + screen.state.currentTopic);
      var singleTopic = doc.data();
      var topicName =  doc.id;
      var topic = {topicName:topicName, topicData:singleTopic};
      topics.push(topic);
      if(topicName === screen.state.currentTopic){
        selectedTopic = topic;
      }
    });
    screen.setState({topics:topics});
    screen.setState({selectedTopic:selectedTopic});
    if(topics.length > 0 && screen.props.navigation.state.params.showDialog){
      screen.showTopics();
    }
    
  });
 }

 listenForNewMessage() {
  if(this.messageListener){
   this.messageListener();
  }
  var screen = this;
  var chatRef = firebase.firestore().collection(this.context.utilities.strings.FS_COLLECTION_CONVERSATION).doc(this.state.chatUID);
  var topicsRef = chatRef.collection(this.context.utilities.strings.FS_COLLECTION_TOPICS);
  var messagesCollection = topicsRef.doc(this.state.currentTopic).collection(this.context.utilities.strings.FS_COLLECTION_MESSAGES);
  // Listen for change in messages

  this.messageListener =  messagesCollection.orderBy("time", "desc").onSnapshot(function (querySnapshot) {
    var messages = [];
    querySnapshot.docs.map((doc) => {
      console.log("listenForNewMessage id : " + doc.id); 
      var messaage = doc.data();
      console.log("listenForNewMessage message : " + JSON.stringify(messaage));
      messages.push(messaage);
    });
    screen.setState({messages:messages});
  });
}

 onTopicSubmit(topicName) {
  if(!this.context.apiService.isTopicExist(topicName, this.state.topics)){
    this.setState({isDialogVisible:false});
    apiService.addNewTopicNode(topicName, this.state.chatUID);
  } else {
    this.context.showToast("Topic is already exists");
  }
 }

 componentWillUnmount(){
  this.context.setChatReceiver(null);
  this.currentTopicListener();
  this.topicListener();
 }

 showTopics(){
  this.setState({showTopicDialog:true});
 }

 onItemSelected(item){
  this.setState({showTopicDialog:false});
  this.setState({selectedTopic:item});
  this.context.apiService.updateCurrentTopic(item.topicName, this.state.chatUID);
 }
 onTopicCancelPress(){
  this.setState({showTopicDialog:false});
 }

 onAddTopicClick(){
  this.setState({showTopicDialog:false});
  this.setState({isDialogVisible:true});
 }

 sendMessage(){
   if(this.state.message.length > 0){
    var chatRef = firebase.firestore().collection(this.context.utilities.strings.FS_COLLECTION_CONVERSATION).doc(this.state.chatUID);
    var topicsRef = chatRef.collection(this.context.utilities.strings.FS_COLLECTION_TOPICS);
    var currentTopicRef = topicsRef.doc(this.state.currentTopic);
    var messagesCollection = currentTopicRef.collection(this.context.utilities.strings.FS_COLLECTION_MESSAGES);
    var message = messagesCollection.doc();
    var data = {
      message:this.state.message,
      sender:this.context.currentUser.uid,
      time:new Date().toString(),
    }
    message.set(data);
    currentTopicRef.update({lastMessageID:message.id});
    this.setState({message:""}); 
  }
 }

 renderRow = ({item}) => {
  return(
    <View style={{
      width:'60%', alignSelf:item.sender === this.state.userID ? "flex-end" : "flex-start",
      backgroundColor: item.sender === this.state.userID ? "#00897b" : "#7cb342", borderRadius:5,marginBottom:5, marginTop:5
      }}>
        <Text style={{color:"#fff", paddingLeft:7,paddingRight:7, paddingTop:7 ,fontSize:16}}>{item.message}</Text>
        <Text style={{color:"#eee", paddingRight:3,paddingBottom:3, fontSize:10, alignSelf:'flex-end'}}>{moment(item.time).format('DD-MMM-YYYY hh:mm a')}</Text>
    </View>
  );
 }
 
 
 render() {
   return (
    <AppConsumer>
    {(context) => (
      <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
          {context.currentChatReceiver && 
          <View style = {{flex:1}}>
            <View style={context.utilities.styles.ChatHeaderViewStyle}>
              <TouchableOpacity onPress={() => context.goBack(this)}>
                <Image source={require('../../../../images/back.png')} style={{width:30, height:30, marginLeft:7}} tintColor={context.utilities.colors.white} />
              </TouchableOpacity> 
              <Image source={{uri: context.currentChatReceiver.bio.profilePicURL}} style={context.utilities.styles.ChatProfileImageStyle} />
              <Text style={context.utilities.styles.ChatReceiverNameTextStyle}>{context.currentChatReceiver.registerData.firstName}</Text>

              {this.state.selectedTopic &&
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress = {() => {this.showTopics()}}>
                  {/* <Text style={{fontSize:13,fontWeight:'bold', color:context.utilities.colors.white}}>{this.state.selectedTopic.topicName}</Text> */}
                  <Text style={{fontSize:13,fontWeight:'bold', color:context.utilities.colors.white}}>{this.state.currentTopic}</Text>
                  <Image source={require('../../../../images/drop_down_arrow.png')} style={{width:20, height:20, marginRight:5}} tintColor={context.utilities.colors.white} />
                </TouchableOpacity>
              }
            </View>
          
            <View style={{flex:1}}>
              {this.state.messages &&
                <FlatList 
                  style ={{padding:10, flex:1}}
                  data = {this.state.messages}
                  renderItem ={this.renderRow}
                  inverted={true}
                  keyExtractor  =  {(item, index) => index.toString()}                
                />
              } 
            </View>

            {/* Bottom Bar */}
            <View style={{height:45,margin:10, alignItems:'center', flexDirection:'row'}}>
              <View style={{flex:1, height:45, width:'100%', marginRight:5, borderRadius:10,backgroundColor:context.utilities.colors.lightGray}}>
                 <TextInput
                   style={this.state.message === '' ? context.utilities.styles.InputTextDisableStyle : context.utilities.styles.InputTextEnableLeftStyle}
                   onChangeText={(text) => { this.setState({ message: text }) }}
                   returnKeyType={"done"}
                   placeholder = "Type message here"
                   underlineColorAndroid='transparent'
                   placeholderTextColor={context.utilities.colors.mediumGray}
                   value={this.state.message}
                 />
              </View>
              <TouchableOpacity onPress={() =>  {this.sendMessage()}} style={{height:40, width:40,alignItems:'center', justifyContent:'center', backgroundColor:context.utilities.colors.headerBGColor, padding:10, borderRadius:100, marginLeft:10}}>
                <Image source={require('../../../../images/send_message.png')} style={{width:18, height:18}} tintColor={context.utilities.colors.white} />
              </TouchableOpacity>
            </View>
          </View>
          }
          <DialogInput isDialogVisible={this.state.isDialogVisible}
                title={"Conversation Topic"}
                message={"Define topic to start conversation"}
                hintInput ={"Enter Topic Name"}
                submitInput={ (inputText) => {this.onTopicSubmit(inputText)} }
                closeDialog={ () => {this.setState({isDialogVisible:false})}}>
            </DialogInput>
         {this.state.topics && <CustomDialogList list={this.state.topics} onCancelPress = {() => {this.onTopicCancelPress()}} onItemSelected = {(item) => {this.onItemSelected(item)}} onAddTopicClick = {() => {this.onAddTopicClick()}} visibility = {this.state.showTopicDialog}/>} 
      </View>
     )}
     </AppConsumer> 
   );
 }
}
