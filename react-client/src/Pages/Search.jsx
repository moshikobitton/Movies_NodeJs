import { useState,useEffect, useContext } from 'react';
import Movie from '../Components/Movie';
import {TextField,Button} from '@mui/material';
import {TabContext} from '../Components/TabContext';

const apiUrl = "http://localhost:5003";

export default function Search() {
  const [name, setName] = useState('');
  const [str, setStr] = useState('');
  const {value, setValue, login, setLogin} = useContext(TabContext);

  useEffect(() => {
    setValue(1);
  }, [])
  
  const getMovies = ()=> {
    if (name != '')
      fetch(apiUrl+`/getMoviesByName/${name}`, {
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
            let str1 = result.results.map((m) => {
              if (m.poster_path != undefined)
                return <Movie search={true} key={m.id} id={m.id}
                  img={'https://image.tmdb.org/t/p/original'+m.poster_path} />
            })
            setStr(str1);
          },
          (error) => {
            console.log("err GET=", error);
          });
  }

  return (
    <div style={{color:"yellow"}}>
      <h1> Search </h1><br />
      <label>Movie name : </label><br />
      <div style={{display:"flex", justifyContent:"center",alignItems:"baseline"}}>
        <TextField
          style={{backgroundColor:"white", borderRadius:10, paddingLeft:10,paddingRight:10}}
          sx={{ m: 1, width: '25ch' }}
          placeholder="  Name"
          onChange={e => setName(e.target.value)}
          variant="standard"
        />
        <Button onClick={getMovies} style={{backgroundColor:"yellow", color:"black", borderRadius:11,height:32}} variant="contained">Search</Button></div>
      <br /><br />
    <div style={{flex:1, justifyContent:"center", alignItems:"center"}}>{str}</div>
    </div>
  )
}
