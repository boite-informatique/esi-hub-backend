import React, { useState , useEffect } from 'react'
import './Register.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/user/register';

const Register = () => {
 
  const [success , setSuccess] = useState(false);
  const [ctg , setCtg] = useState('Etudiant');
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [matchPwd , setMatchPwd] = useState("");

  const [email, setEmail] = useState(""); 

  const [pwd, setPwd ] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [err , setErr] = useState('');
  const [promo , setPromo] = useState("");

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
}, [name])

useEffect(() => {
  setValidPwd(PWD_REGEX.test(pwd));
  setValidMatch(pwd === matchPwd);
}, [pwd, matchPwd])

useEffect(() => {
  setErr('');
}, [name, pwd, matchPwd])


  
  const handleSumbit = async (e) => {
      e.preventDefault();
      const v1 = USER_REGEX.test(name);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErr("Invalid Entry");
            return;
          }
          try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ name:name, password:pwd, email:email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
           
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setName('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErr('No Server Response');
            } else if (err.response?.status === 409) {
                setErr('Username Taken');
            } else {
                setErr('Registration Failed')
            }
          
          }
        }

  return (
    <>
     {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/">go home</Link>
                    </p>
                </section>
            ) : (
    <div>
      <img src='/logo2(1).svg' alt='cv chweya'  className="helloo"></img>
      <div className='centert'>
      
        <h1>Register</h1>
        <form onSubmit={handleSumbit} >
           <p>{err}</p>
          <div className='txt_field'>
              <input type="text" required 
              onChange={(e) => setName(e.target.value)}
              value={name}
              />
              <label>Name</label>
              <span></span>
          </div>
          <div className='txt_field'>
              <input type="text" required
              onChange={(e) => setEmail(e.target.value)}
              value={email} />
              <label>Email</label>
              <span></span>
          </div>
          <div className='txt_field'>
              <input type="password" required 
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}/>
              <label>Password</label>
              <span></span>
          </div>
          <div className='txt_field'>
              <input type="password" required 
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}/>
              <label>Confirm Password</label>
              <span></span>
          </div>
          
              <div className='categorie'>
                <label for="catégorie" >Catégorie: </label><br></br><br></br>
                <select name='catégorie' id='catégorie' onChange={ (e) => setCtg(e.target.value)} required >
                  <option value="Etudiant">Etudiant </option>
                  <option value="Enseignant"> Enseignant</option>
                  <option value="club">Club</option>
                  <option value="Admin">Administration </option>                  
                  
                  </select>
              </div>

          
           { (ctg === 'Etudiant') && <div className='promo'>
              <label className='promoo'>Promo</label><br></br> <br></br> 
              <div className='espace'>
              <input type="radio" id="1cpi" name="promo" value="1cpi" onChange={(e) => setPromo(e.target.value)}/>
              <label for="1cpi">1CPI</label>
             
              <input type="radio" id="2cpi" name="promo" value="2cpi" onChange={(e) => setPromo(e.target.value)}/>
              <label for="2cpi">2CPI</label>

              <input type="radio" id="1cs" name="promo" value="1cs" onChange={(e) => setPromo(e.target.value)}/>
              <label for="1cs">1CS</label>

              <input type="radio" id="2cs" name="promo" value="2cs" onChange={(e) => setPromo(e.target.value)}/>
              <label for="2cs">2CS</label>

              <input type="radio" id="3cs" name="promo" value="3cs"/>
              <label for="3cs">3CS</label>

              </div> 
            
              
          </div> }

        <input  type="submit" value="Register" ></input>
         
        
        </form>


      </div>

    </div> )}
    </>
  
 
  )
}

export default Register