import React, { Component } from 'react';
import {Input,Table} from 'antd';
import './chat.css';
import SockJsClient  from "react-stomp";
import UsernameGenerator from "username-generator";
import Fetch from "json-fetch";
import { TalkBox } from "react-talk";
import randomstring from"randomstring";
import { UserOutlined } from '@ant-design/icons';
import * as api from 'lib/api';


class chat extends Component {

    constructor(props, context) {
        super(props);

        this.randomUserName = UsernameGenerator.generateUsername("-");
        // this.randomUserId = randomstring.generate();
        this.nickName = "";
        this.box=null;
         this.cnt=0;

          this.columns = [
          {
            title: 'Ip Address',
            dataIndex: 'ip',
           // key: 'ip',
          },
           {
            title: 'Session id',
            dataIndex: 'sessionId',
            key: 'sessionId',
          }
        
        ];

       this.state = {
            ip : "10.51.15.31",
            clientConnected:false,
            messages: [
            //     {

            //     "author": "Ponger",
            //     "authorId": "pong3",
            //     "message": "How you doin'!",
            //     "timestamp": new Date().getTime()
            // },
            // {
            //     "author": "Ponger2",
            //     "authorId": "pong4",
            //     "message": "zzz!",
            //     "timestamp": Date.now().toString()
            // }
        ]
            
        }
    }
    


      async componentDidMount() {
        var history=[] ;
        var reqIp ="";
        var list ;
          await api.gethistory().then(function (response) {
            if(response.status == 200)
            {
              reqIp= response.data.ip;
              list = response.data.list;
              if(response.data.history){
              
               response.data.history.forEach((item,idx)=>{
                history.push({
                    "author":item["author"],
                    "authorId":item["authorId"],
                    "message":item["message"],
                    "timestamp":item["timestamp"]
                  })
                });
              }
            }else{
            
            }
          })
          .catch(function (error) {
            console.log(error);
          });
          if(list)
          this.cnt = list.length
          this.setState({
            messages: history,
            ip:reqIp,
            dataSource: list
          })
      }
          onMessageReceive = (msg, topic) => {
            if(msg.author !== (this.nickName ? this.nickName  : this.randomUserName))
            this.setState(prevState => ({
              messages: [...prevState.messages, msg]
            }));

              if(this.box)
              this.box.scrollToBottom();

              if(msg.cnt){
                this.cnt = msg.cnt;
              }
              if(msg.list){
                this.setState(
                  {dataSource:msg.list}
                )
                //this.dataSource=msg.list;
              }
           // this.scrollToBottom();
            //$('.talk-box-body').animate({scrollTop: $('.talk-box-body').scrollHeight})
            
          }

          sendMessage = (msg, selfMsg) => {
            // selfMsg is the message object constructed from the message typed by the current user
            // NOTE: selfMsg doesn't include timestamp and needs to be added by the user of the module
            // in client or server side as required

            selfMsg["timestamp"] = new Date().getTime();
            this.setState(prevState => ({
                messages: [...prevState.messages, selfMsg]
            }));
            // If message sending failed return false otherwise return true
            try {
              // Insert code to send the message below

              const s = {name: this.nickName ? this.nickName  : selfMsg.author, session: "0", content: msg,timestamp:selfMsg["timestamp"]}
              this.clientRef.sendMessage("/app/hello", JSON.stringify(s));
              
              return true;
            } catch (e) {
              return false;
            }
          }

          nickChange = (input)=>{
            this.nickName  = input.target.value
          }
      

    render() {
      
        console.log("chat렌더!")
        console.log(this.state)
        const wsSourceUrl = "http://10.51.15.31:8076/chat";
        return (
            <div id="chat-viewer">
                <div id="nic-name">
                <Input size="large" placeholder="닉네임을 입력하세요" prefix={<UserOutlined />} onChange={this.nickChange}/>
                </div>
                <div id="chat-content">
            <TalkBox topic="대화방ㅎㅎ" currentUserId={ this.state.ip }
                currentUser={this.nickName ? this.nickName  : this.randomUserName} messages={this.state.messages}
               onSendMessage={ this.sendMessage } connected={this.state.clientConnected}
               onKeyDown={this.updateInputValue}
               ref={ref => {
                this.box = ref;
              }}
               />
               
               <div id='chat-connect-list'>
          <Table dataSource={this.state.dataSource} columns={this.columns} />
               현재입장인원:{this.cnt}
               </div>
            <SockJsClient
            url={wsSourceUrl}
            topics={["/topics/testchat"]}
            onMessage={this.onMessageReceive }
            ref={(client) => { this.clientRef = client; }} 
            onConnect={ () => {this.setState({ clientConnected: true }) } }
            onDisconnect={ () => { this.setState({ clientConnected: false }) } }
            />
            </div>
            </div>
        );
    }
}

export default chat;