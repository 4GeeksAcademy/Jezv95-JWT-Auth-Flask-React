import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate, Link } from "react-router-dom";
import storeReducer from "../store.js";
import { Navigate } from "react-router-dom";


const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { store, dispatch } = useGlobalReducer()
   
    function userLogin(e){
        e.preventDefault()
        console.log('send data');
        console.log(email,password);

       const requestOptions={
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                      "email": email,
                      "password": password,
                       })
        };
        fetch('https://humble-space-sniffle-wr774gjg5v54h59j9-3001.app.github.dev/api/login', requestOptions)
        .then((response)=> {
            console.log(response);
            if(response.status == 200){
                dispatch({ type:'set_auth', payload: true })
            };
             
            return response.json()

        })
        .then((data)=> {
            console.log(data)
            localStorage.setItem("token", data.access_token);
        });
       
       }
  

   return(
       <>
       { store.auth ? <Navigate to='/private'/> :
       <form className='container' onSubmit={userLogin}>
        <div className="mb-3">
           <label for="exampleFormControlInput1" className="form-label">Email</label>
           <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Enter Email"/>
           </div>
        <div className="mb-3">
           <label for="exampleFormControlInput2" className="form-label">Password</label>
           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Enter Password"/>
           </div>
       <button type="submit" className="btn btn-primary">Log In</button>
       </form>
       }
   </>
   );
   };

export default LoginForm;