import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function sendData(e) {
    e.preventDefault();
    // crear el baackend como variable luego
      console.log('send data')
      console.log(email, password)

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.status !== 200) {
        setError('Invalid email or password.');
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      

      dispatch({ type: "set_auth", payload: {...data.user,token:data.access_token  } });
      setError('');
      navigate("/private");

    } catch (err) {
      console.error(err);
      setError('Login failed.');
    }
  }

  return (
   
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative " >
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-xxl-4 col-lg-5">
                    <div className="card ">

                        {/* <!-- Logo --> */}
                        <div className=" py-3 text-center card-orange">
                            
                        </div>

                        <div className="card-body p-4">

                            <div className="text-center w-75 m-auto">
                                
                                <h4 className="text-dark-50 text-center pb-0 fw-bold">Hello, welcome User!!</h4>
                                <p className="text-muted mb-4">Enter your email address and password to access user panel.</p>
                            </div>

                            <form action="#">
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="mb-3">
                                 <label className="form-label">Email</label>
                                 <input
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   type="email"
                                  className="form-control" />
      
                                </div>

                                <div className="mb-3">
                                        <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input value={password} onChange={e => setPassword(e.target.value)}
                                        type="password" className="form-control"/>
                                        </div>
                                </div>


                               <div className="d-flex justify-content-center">
                                    <button type="submit" onClick={sendData} className="text-light btn btn-success m-2">
                                     Log in
                                    </button>

                                    <Link to="/signup">
                                      <button className="text-light btn btn-primary m-2">Sign Up</button>
                                    </Link>
                                
                                    </div>

                            </form>
                        </div> 
                        {/* <!-- end card-body --> */}
                    </div>
                    {/* <!-- end card --> */}

                    <div className="row mt-3">
                        <div className="col-12 text-center">
                            <p className="text-light">Don't have an account? <Link to="/signup">
                                      <button type="button" className="btn fw-bold text-light">Sign up</button>
                                    </Link></p>
                        </div> 
                        {/* <!-- end col --> */}
                    </div>
                    {/* <!-- end row --> */}
                        <div className="ml-auto text-center">
                        <Link to="/select_role">
                            <button className="btn btn-outline-light mx-4">Back to Roles</button>
                        </Link>
                        <Link to="/">
                          <button className="btn btn-outline-light mx-4">Back Home</button>
                        </Link>
                        </div>
                       
                        
                        
                </div> 
                {/* <!-- end col --> */}
            </div>
            {/* <!-- end row --> */}
        </div>
        {/* <!-- end container --> */}
    </div>
  
  );
};

export default LoginForm;
