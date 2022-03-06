import React, { useState, useRef, useEffect } from "react";
import classes from "./inbox.module.css";
// import TextField from '@material-ui/core/TextField'
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { useLocation } from "react-router-dom";

const Inbox = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access")
  );

  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);

  const textMessage = useRef();
  //   let fData = new FormData()
  let location = useLocation();
  // let room_id = location.state?.id;

  const fetchMessages = async () => {
    // e.preventDefault();
    let body = {
      room_id: "31",
      recipient: 1,
    };
    let requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(accessToken)}`,
      },
      body: JSON.stringify(body),
    };
    let response = await fetch("api/messages/", requestOption);

    let data = await response.json();

    setMessages(data);

    console.log("received messages - ", data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  console.log("room - id 31");

  const sendHandler = async (e) => {
    e.preventDefault();
    let body = {
      text: textMessage.current.value,
      room_id: "31",
      recipient: 1,
    };

    // fData.append('user',1)
    // fData.append("text", textMessage.current.value);
    if (textMessage.current.value.length > 0) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${String(accessToken)}`,
        },
        body: JSON.stringify(body),
      };
      let response = await fetch("api/create-message/", requestOptions);
      const data = await response.json();
      console.log("your message - ", textMessage);
      console.log("request option - ", requestOptions);
    }
    textMessage.current.value = "";
    fetchMessages();
  };

  return (
    <div className={classes.inbox}>
      <div className={classes.container}>
        <div className={classes.chatbar}>
          <h1>Chatbar</h1>
        </div>
        <div className={classes.chatbody}>
          {messages.map((message, index) => {
            return (
              <div key={message.id} className={classes.textmessage}>
                <h5 key={message.index}>{message.sender.username}</h5>
                <h3 key={message.id}>{message.text}</h3>
              </div>
            );
          })}
        </div>
        <div className={classes.chatinputbox}>
          <form onSubmit={sendHandler}>
            <Input
              type="text"
              id="input_message"
              name="input_message"
              placeholder="enter message"
              myref={textMessage}
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
      Inbox
    </div>
  );
};

export default Inbox;
