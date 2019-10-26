import React, { useRef } from "react";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login",{
      username: usernameRef.current.value,
      password: passwordRef.current.value
    })
    .then(res => {
     localStorage.setItem('token', res.data.payload);
     console.log(props)
     props.history.push('/bubble_page')
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <input ref={usernameRef} placeholder='Username' type='text'/>
        <input ref={passwordRef} placeholder='Password' type='text'/>
        <button onClick={submit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
