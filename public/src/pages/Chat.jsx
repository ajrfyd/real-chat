import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { allUsersRoute } from "../utils/APIRoutes";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
      const localData = window.localStorage.getItem('userInfo');
      if(localData !== null) {
        setIsLoaded(true);
        return JSON.parse(localData);
      } else {
        navigate('/login');
        return null;
      }
    }
  );
  const [currentChat, setCurrentChat] = useState(undefined);



  const getAvatarImg = async () => {
    if(currentUser && currentUser.isAvatarImageSet) {
      const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
      setContacts(data.data);
    } else {
      navigate('/setavatar');
    }
  }

  useEffect(() => {
    getAvatarImg();
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {
          isLoaded && currentChat === undefined ? 
            <Welcome currentUser={currentUser} /> :
            <ChatContainer currentChat={currentChat}/>
        }
      </div>
    </Container>
  )
}
export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`