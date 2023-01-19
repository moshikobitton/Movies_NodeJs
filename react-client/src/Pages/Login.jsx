import React from 'react'

export default function Login() {

  return (
    <div style={{fontSize: 20 , padding:10}}>
      <h1> Login </h1>
      <label>Username : </label>
      <input type="text" placeholder='Enter your username'/> <br /><br />
      <label>Password : </label>
      <input type="password" placeholder='Enter your password'/> <br /><br />
      <button style={{fontWeight:"bold", backgroundColor:"yellow", borderRadius:20 , width:100}}>Login</button>
    </div>
    
  )
}
