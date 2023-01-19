import React from "react";

export default function Register() {
  return (
    <div style={{ fontSize: 20, padding: 10 }}>

          <label>★ Username: </label>
            <input type="text" placeholder="Enter username" /><br /><br />
          <label>★ Password: </label>
          <input type="Password" placeholder="Enter password" /><br /><br />
          <label>★ Company Name: </label>
            <input type="text" placeholder="Enter Company Name" /><br /><br />
          <label>★ Cinemas I own: </label>
            <input type="number" placeholder="Number of Cinemas" /><br /><br />
          <label>★ Operation Country: </label>
            <select>2</select><br /><br />
          <label>★ Year established: </label>
            <select>1</select><br /><br />

      <button> submit</button>
    </div>
  );
}
