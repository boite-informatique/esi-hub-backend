import React, { useState } from 'react'
import './Register.css'

const Register = () => {
  const [ctg , setCtg] = useState('Etudiant');

  return (
    <div>
      <img src='/logo2(1).svg' alt='cv chweya'  className="helloo"></img>
      <div className='centert'>
      
        <h1>Register</h1>
        <form >
           
          <div className='txt_field'>
              <input type="text" required />
              <label>Name</label>
              <span></span>
          </div>
          <div className='txt_field'>
              <input type="text" required />
              <label>Email</label>
              <span></span>
          </div>
          <div className='txt_field'>
              <input type="password" required />
              <label>Password</label>
              <span></span>
          </div>
          <div className='radio'>
              <label className='gender'>Gender</label><br></br> <br></br>
              <div className='espace'>
              <input type="radio" id="Male" name="gender" value="Male"/>
              <label for="Male">Male</label>
             
              <input type="radio" id="Female" name="gender" value="Female"/>
              <label for="Female">Female</label>

              </div>
              <div className='categorie'>
                <label for="catégorie" >Catégorie: </label><br></br><br></br>
                <select name='catégorie' id='catégorie' onChange={ (e) => setCtg(e.target.value)} >
                  <option value="Etudiant">Etudiant </option>
                  <option value="Enseignant"> Enseignant</option>
                  <option value="club">Club</option>
                  <option value="Admin">Administration </option>                  
                  
                  </select>
              </div>

          </div>
           { (ctg === 'Etudiant') && <div className='promo'>
              <label className='promoo'>Promo</label><br></br> <br></br> 
              <div className='espace'>
              <input type="radio" id="1cpi" name="promo" value="1cpi"/>
              <label for="1cpi">1CPI</label>
             
              <input type="radio" id="2cpi" name="promo" value="2cpi"/>
              <label for="2cpi">2CPI</label>

              <input type="radio" id="1cs" name="promo" value="1cs"/>
              <label for="1cs">1CS</label>

              <input type="radio" id="2cs" name="promo" value="2cs"/>
              <label for="2cs">2CS</label>

              <input type="radio" id="3cs" name="promo" value="3cs"/>
              <label for="3cs">3CS</label>

              </div> 
            
              
          </div> }

        <input  type="submit" value="Register" ></input>
         
        
        </form>


      </div>

    </div>
    
  
 
  )
}

export default Register