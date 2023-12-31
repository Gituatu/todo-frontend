import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import {Context, server} from "../main"
import toast from "react-hot-toast"
import { useContext } from 'react'

const Register = () => {
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const {isAuthenticated, setIsAuthenticated, loading, setLoading}=useContext(Context);


  const submitHandler= async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {data}= await axios.post(`${server}/users/new`,{
        name, email, password,
      },{
        headers:{
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    toast.success(data.message);
    setIsAuthenticated(true);
    setLoading(false);
    } catch (error) {
      toast.error("some error");
      console.log(error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if(isAuthenticated) return <Navigate to={"/"}/>;


  return (
    <div className='login'>
        <section>
            <form onSubmit={submitHandler}>
                <input value={name} type='text'
                onChange={(e) => setName(e.target.value)}
                 placeholder='Name'/>
                <input value={email} type='email'
                onChange={(e) => setEmail(e.target.value)}
                 placeholder='Email'/>
                <input value={password} type='password'
                onChange={(e) => setPassword(e.target.value)}
                 placeholder='Password'/>
                <button disabled={loading} type='submit'>Sign Up</button>
                <h4>Or</h4>
                <Link to="/login">Login</Link>
            </form>
        </section>
    </div>
  )
}

export default Register