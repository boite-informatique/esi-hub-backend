import React from "react";
import './LoginForm.css'
import { useState , useEffect , useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Background from "../Background/Background";
import Doc from "../Doc";
import { Link } from "react-router-dom";
import axios from "axios";


const LoginForm = () => {
  const {setAuth} = useContext(AuthContext);
  const [user , setUser] = useState('');
  const [pwd , setPwd] = useState('');
  const [success , setSuccess] = useState(false);
  const [err , setErr] = useState('');
  const LOGIN_URL = '/api/user/login';

  
    const handleSumbit = async (e) =>{
          e.preventDefault();
          try{
            const response = await axios.post(LOGIN_URL , JSON.stringify({email:user,password: pwd}) , 
            {
              headers: {'Content-Type': 'application.json'}
            }
            )
           const accessToken = response?.data.accessToken;
            const roles = response?.data.roles;
            setAuth({user, pwd , roles , accessToken })
            setSuccess(true);
            setPwd('');

          }catch(err) {
            if (!err.response){
              setErr('no server response');
            }else if (err?.response?.status === 400 ){
              setErr('Missing Username or Password');
            }else if (err.response?.status === 401){
              setErr('unothorized');
            }else {
              setErr('Login failed');
              alert(err);
            }

          }
          
          }

  useEffect( () => {
   setErr('');    
  }, [user , pwd])       

  return (
    <>
    
    {success ? ( <Doc user={user} />  ) :

    <div>
<div >
    <Background />
      <div className='center'>
      <img src='/logo2(1).svg' alt='cv chweya'  className="hello"></img>
        <form on onSubmit={handleSumbit}>
        <h1>Login</h1>
        <p>{err}</p>
          <div className='txt_field'>
              <input type="text" 
                      required
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      value={user}  />
              <label>Email</label>
              <span></span>
          </div>
          <div className='txt_field'>
              <input type="password"
                     required
                     onChange={(e) => setPwd(e.target.value)}
                     value= {pwd}
                />
              <label>Password</label>
              <span></span>
          </div>

        <div className='pass' >Forgot password?</div>
         <input  type="submit" value="Login"></input>
          <div className='signup_link' >
           Not a member?  <Link to="/register"> Sign up </Link>
            </div>
        
        </form>


      </div>

    </div>
    </div> }
    </>
  )
}

export default LoginForm