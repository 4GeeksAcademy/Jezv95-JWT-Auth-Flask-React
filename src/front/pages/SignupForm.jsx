import React, { useEffect, useState } from 'react'

const SignupForm = () => {
    const [inputEmail, setinputEmail] = useState('')
    const [inputPassword, setinputPassword] = useState('')

function addUser(e){
        e.preventDefault()
        const requestOptions={
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                      "email": inputEmail,
                      "password": inputPassword,
                })
        };
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/signup', requestOptions)
        .then((response)=> response.json())
        setinputEmail('')
        setinputPassword('')
        
       }

return(
    <>
    <form className='container' onSubmit={addUser}>
     <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">Email</label>
        <input type="text" value={inputEmail} onChange={(e) => setinputEmail(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Enter Email"/>
        </div>
     <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">Password</label>
        <input type="password" value={inputPassword} onChange={(e) => setinputPassword(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Enter Password"/>
        </div>
    <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" className="btn btn-primary">Add user</button>
    </form>
</>
);
};

export default SignupForm;