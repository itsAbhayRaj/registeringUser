import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer, toastContainer} from 'react-toastify';
import { handleError,handleSuccess } from '../utils';

function Login(){

    const [loginInfo,setInfo] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate();

    function handleChange(e){
        const {name,value} = e.target;
        const copyLoginInfo ={...loginInfo};
        copyLoginInfo[name]=value;
        setInfo(copyLoginInfo);
        console.log(loginInfo);
    }

    const handleLogin = async(e)=>{
        e.preventDefault();
        const {email,password} = loginInfo;
        if(!email || !password){
            return handleError("Email and password are required !!! ")
        }
        try{
            const url = "https://registering-user-api.vercel.app/auth/login";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const {success, message, jwtToken,name, error} = result;
        
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                    navigate('/home')
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else{
                handleError(message);
            }

        }catch(err){
            handleError(err);
        }
    }
    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                
                <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} type="email"  name="email" placeholder="Enter your email..." value={loginInfo.email}/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} type="password" name="password" placeholder="Enter your password..." value={loginInfo.password}/>
                </div>
                <button>Login</button>
                <span>Not registered  ?<Link to="/signup">Register</Link></span>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Login;
