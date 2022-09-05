import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Link, Navigate } from "react-router-dom";
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [values, setValues] = useState({
    userName: '',
    password: '',
  });
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if(handleValidation()) {
      const { userName, password } = values;
      const { data } = await axios.post(loginRoute, {
        userName, password
      })

      if(data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if(data.status == true) {
        localStorage.setItem(process.env.REACT_APP_USER, JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  const handleChange = (e) => {
    setValues(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleValidation = () => {
    const { password, userName } = values;
    if (password === '') {
      toast.error(
        "Email and Password is required.",
        toastOptions
      );
      return false;
    } else if (userName.length === '') {
      toast.error(
        "Email and Password is required.",
        toastOptions
      );
      return false;
    } 

    return true;
  };

  useEffect(() => {
    if(localStorage.getItem('userInfo')) {
      navigate('/');
    };
  });

  return (
    <>
      <FormContainer>
        <form onSubmit={submitHandler}>
          <div className="brand">
            <img src={Logo} alt="Logo Image" />
            <h1>snappy</h1>
          </div>
          <input 
            type="text" 
            placeholder='Username' 
            name='userName' 
            onChange={e => handleChange(e)}
            min='3'
          />
          <input 
            type="password" 
            placeholder='Password'
            name='password' 
            onChange={e => handleChange(e)}
          />
          <button type='submit'>Login</button>
          <span>Don't have an account?<Link to='/register'>Register</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

export default Login;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: #fff;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: .1rem solid #4e0eff;
      border-radius: .4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #4e0eff;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
        background-color: #6200ee;
      }
    }

    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`