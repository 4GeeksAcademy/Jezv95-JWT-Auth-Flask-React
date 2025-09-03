import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import storeReducer from "../store.js";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	 const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	 function userLogout(){
		
		localStorage.removeItem("token");

		dispatch({ type:'set_auth', payload: false })

		navigate('/')

	 }
       


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				
				<div className="ml-auto">
					 { store.auth ? null: <Link  to="/signup">
						<button className="btn btn-secondary  m-2">Sign Up</button>
					</Link> }
					 { store.auth ? <button onClick={userLogout} className="btn btn-danger">Log out</button> :
					 <Link  to="/login">
						<button className="btn btn-success m-2">Log In</button>
					</Link>}
				</div>
			</div>
		</nav>
	);
};