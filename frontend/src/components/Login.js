import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const Login = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[])

    const handleLogin=async()=>{
        let result=await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({email,password}),
             headers: {
                'Content-Type': 'application/json'
            }
        });
        result=await result.json();
        console.warn(result);
        if(result.name){
            localStorage.setItem('user',JSON.stringify());
            navigate("/");
        }else{
            alert("Please enter correct details.");
        }
    }


    return (
        <div className="login">
            <h1>Login</h1>
            <input
                className="inputBox"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
            />
            <input
                className="inputBox"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button onClick={handleLogin} className="loginBtn">Login</button>
        </div>
    );
};

export default Login;
