import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contacts from "../components/Contacts";
import { allUsersRoute } from "../utils/APIRoutes";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
      const localData = window.localStorage.getItem('userInfo');
      if(localData !== null) {
        return JSON.parse(localData);
      } else {
        navigate('/login');
        return null;
      }
    }
  );


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

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser}/>
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