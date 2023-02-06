import React from 'react'
import myLogo from '../myLogo.png'

export default function HomePage() {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop:"15%"}}>
      <br /><br />
      <div style={{width:"fit-content", backgroundColor:'yellow', borderRadius:100}}>
        <img style={{height:300, width:300}} src={myLogo}/>
      </div>
    </div>
    
  )
}
