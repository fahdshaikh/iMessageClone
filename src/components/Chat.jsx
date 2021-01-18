import React, { useState, useEffect } from 'react';
import './Chat.css';
import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChatName, selectChatId } from '../features/chatSlice';
import db from '../Firebase';
import firebase from 'firebase';
import { selectUser } from './../features/userSlice';
import FlipMove from 'react-flip-move';

const Chat = () => {
  const user = useSelector(selectUser);
  const [input, setInput] = useState('');
  const chatName = useSelector(selectChatName);
  const [messages, setMessages] = useState([]);
  const chatId = useSelector(selectChatId);

  useEffect(() => {
    if (chatId) {
      db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    // FireBase
    db.collection('chats').doc(chatId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput('');
  };

  return (
    <>
      <div className='chat'>
        {/* Chat Header */}
        <div className='chat__header'>
          <h4>
            To: <span className='chat__name'>{chatName}</span>
          </h4>
          <strong>Details</strong>
        </div>

        {/* Chat Msgs */}
        <div className='chat__messages'>
          <FlipMove>
            {messages.map(({ id, data }) => (
              <Message key={id} contents={data} />
            ))}
          </FlipMove>
        </div>

        {/* Chat Input */}
        <div className='chat__input'>
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='iMessage'
              type='text'
            />
            <button onClick={sendMessage}> Send Message </button>
          </form>
          <IconButton>
            <MicNoneIcon className='chat__mic' />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Chat;
