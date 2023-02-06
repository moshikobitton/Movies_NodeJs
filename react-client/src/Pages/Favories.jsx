import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {TabContext} from '../Components/TabContext';
import Movie from "../Components/Movie";

const apiUrl = "http://localhost:5003";

export default function Favories() {
  const [str, setStr] = useState("");
  const {setValue, login, toggle} = useContext(TabContext);

  useEffect(() => {
    setValue(2);
    if(login.user.id === 0) return;

    fetch( apiUrl + `/getCompanyMovies/${login.user.id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          let str1 = result.recordset.map((m) => {
              return <Movie search={false} key={m.id} id={m.id}
              img={'https://image.tmdb.org/t/p/original'+m.src} />
          })
          setStr(str1);
        },
        (error) => {
          console.log("err post=", error);
        });

  }, [toggle]);
  

  return (
    <div style={{ fontSize: 20, padding: 10, color: "yellow" }}>
      <h1> My Favorites </h1>
      <div style={{flex:1, justifyContent:"center", alignItems:"center"}}>{str}</div>
    </div>
  );
}
