import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { AppConsumer } from '../../../../context/AppProvider';
import ProgressView from '../../../../customViews/ProgressView';

export default class ChatsView extends Component {
  constructor(args) {
    super(args);
    this.state = {
      users: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    var userConversationNode = this.context.apiService.getUserConversationNodeForChat(this.context.currentUser.uid);
    this.userConversations = userConversationNode.onSnapshot(this.onCollectionUpdate);

    this.context.apiService.isUserConversationExist(this.context.currentUser.uid,(exists) => {
      if(!exists){
        this.setState({ isLoading: false });
      }
    });
  }

  componentWillUnmount() {
    this.userConversations();
  }

  onCollectionUpdate = (querySnapshot) => {
    var screen = this;
    var userData = [];
    var totalData = querySnapshot.size;
    querySnapshot.forEach((doc) => {
      if(doc.exists){
        const data = doc.data();
        console.log("ChatView onCollectionUpdate  receiverID : " + data.receiverID + " N chatUID : " + doc.id);
        screen.context.apiService.getUserData(data.receiverID, (error, response) => {
          if (!error) {
            response.id = data.receiverID;
            var singleUser = { chatUID: doc.id, singleMessage: {}, topicName: data.topicName, user: response };
            if (data.lastMessageID === "") {
              userData.push(singleUser);
              if (userData.length === totalData) {
                screen.setState({ users: userData });
                screen.setState({ isLoading: false });
              }
            } else {
              var chatRef = screen.context.apiService.getConversationMessagesNode(doc.id).doc(data.lastMessageID);
              chatRef.onSnapshot(function (doc) {
                singleUser.singleMessage = doc.data();
                userData.push(singleUser);
                console.log("ChatView onCollectionUpdate userData.length : " + userData.length + " N " + totalData);
                if (userData.length === totalData) {
                  screen.setState({ users: userData });
                  screen.setState({ isLoading: false });
                }
              });
            }
          }
        });
      } else {
        screen.setState({ isLoading: false });
      }
    });
  }


  onItemClick(item) {
    this.context.setChatReceiver(item.user);
    this.context.moveToScreenPayload(this.props.screen, this.context.utilities.strings.APP_SCREEN_CHAT, { currentTopic: item.topicName });
  }

  render() {
    return (
      <AppConsumer>
        {(context) => (
          <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
            {this.state.users.length > 0 &&
              <FlatList
                extraData={this.state.users}
                data={this.state.users}
                renderItem={({ item }) =>
                  <TouchableOpacity style={context.utilities.styles.ContactsRowStyle} onPress={() => { this.onItemClick(item) }}>
                    <Image source={{ uri: item.user.bio.profilePicURL }} style={context.utilities.styles.ContactsProfileImageStyle} />
                    <View style={{ flex: 1}}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[context.utilities.styles.ContactsUserNameTextStyle,{marginRight:0}]}>{item.user.registerData.firstName + " " + item.user.registerData.lastName}</Text>
                        <Text style={context.utilities.styles.ChatsViewTopicNameTextStyle}> {" - " + item.topicName}</Text>
                      </View>
                      {item.singleMessage && item.singleMessage.message &&
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <Text style={context.utilities.styles.ChatsViewLastMessageTextStyle}>{item.singleMessage.message}</Text>
                          <Text style={context.utilities.styles.ChatsViewLastMessageDateStyle}>{context.apiService.getFormattedTime(item.singleMessage.time, context.utilities.strings.DISPLAY_TIME_FORMAT_1)}</Text>
                        </View>
                      }
                    </View>
                  </TouchableOpacity>
                }
              />
            }
            {this.state.users.length === 0 && this.state.isLoading === false &&
              <View style={context.utilities.styles.CenterDataViewStyle}>
                <Text style={context.utilities.styles.NoDataTextStyle}>{context.utilities.strings.msgNoChatFound}</Text>
              </View>
            }
            {this.state.isLoading && <ProgressView />}
          </View>
        )}
      </AppConsumer>
    );
  }
}
