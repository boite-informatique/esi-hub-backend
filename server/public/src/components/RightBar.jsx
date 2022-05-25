import React, { useState } from 'react'
import "./RightBar.css"

import Avatar from '@mui/material/Avatar';
export const RightBar = () => {

  const [amis,setAmis]=useState([{name:"Brahim Haloucha",statu:false},{name:"Yacine gzn",statu:true},{name:"Chakib ouzane",statu:true},{name:"Miloudi Mohamed",statu:false},{name:"Bahaa Hammadi",statu:false},])
  const [Anouncs,setAnouncs]=useState([
  { id:1 ,
    user: "Amine Benchaa",
    OP:true,
    vis:  "ALL",
    title: "un portefeuille noir",
    text : "bonjour, j'ai perdu un portefeuille noir à l'école si quelqu'un l'a trouvé contactez moi svp.",},
    { id: 2,
      user: "Brahim Haloucha",
      OP:false,
      vis:  "ALL",
      title: "cahier d'algorithmes",
      text :"Salam, j'ai oubliée mon cahier d'algorithmes dans la salle de TP , si quelqu'un le trouve s'il vous plaît me contacter "
      },

  ]);
    const Ami=({name,statu})=>{
      const [amiOpen,setAmisOpen]=useState(true);
     const openAmi=()=>{
    if(amiOpen===true){setAmisOpen(false)}else{setAmisOpen(true)};
      }    
       return (
      <>
       {amiOpen && <div className="Am" onClick={openAmi}><div className="Avatar AVAM "><Avatar sx={{height:40,width:40}}/>{statu && <img className="greenC"  alt="AMi" src="./assets/enLigneGreenCircle.png"/>}</div> <div className="AmText">{name}</div></div>}
       {!amiOpen && <div className="AmO" onClick={openAmi}><div className="Avatar AVAM "><Avatar sx={{height:40,width:40}}/></div> <div className="AmText">{name}</div>{statu && <img className="greenCO" alt="AMi" src="./assets/enLigneGreenCircle.png"/>}</div>}
     </>)
    }
   

  
  return (
   <div className="RightBar">
   <div className="space"></div>
   <div className="ObjetPerdu">
    <div className="OpTitle">Objet Perdu</div>
   {Anouncs.map((An)=>( <div className="AnOp"><p>{An.title}</p></div>))}
       </div>
       
       <div className="ListAmis">
       { amis.map((Am)=>(<Ami name={Am.name} statu={Am.statu}/> ))} 
       
       </div> 
       </div>
  )
}
