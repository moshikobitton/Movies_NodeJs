import {IconButton,Input,TextField,InputAdornment,FormControl,Button} from '@mui/material';
import {Visibility,VisibilityOff} from '@mui/icons-material';
import { useState, useEffect, useContext} from 'react';
import {TabContext} from '../Components/TabContext';
import {useNavigate } from 'react-router-dom';

const apiUrl = "http://localhost:5003";

export default function Login() {
  const {setValue, setLogin} = useContext(TabContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const loginBtn = () => {
      if(password === '' || username === '') return alert();
      fetch(apiUrl+`/getCompany/${username}/${password}`, {
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
            let user = result.results.recordset[0];
            if (user === undefined) return;
            let loginObj = {logIn:"none", logOut:"", user};
            setLogin(loginObj);
            setPassword("");
            setUsername("");
            setValue(0);
            navigate("/"+ apiUrl + '/');
          },
          (error) => {
            console.log("err post=", error);
          });
  }
  

  useEffect(() => {
    setValue(5);
  }, [])

  return (
    <div style={{fontSize: 20 , padding:10, color:"yellow"}}>
      <h1> Login </h1><br />
      <label>Username : </label><br />
      <TextField
          
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{backgroundColor:"white", borderRadius:10 ,paddingLeft:10 ,paddingRight:10}}
          sx={{ m: 1, width: '25ch' }}
          placeholder="Username"
          variant="standard"
        />      <br /><br />
        <label>Password : </label><br />
      <FormControl style={{backgroundColor:"white", borderRadius:10 ,paddingLeft:10 ,paddingRight:10}} sx={{width: '25ch'}} variant="standard">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        
        <br /><br />
        
        <Button onClick={loginBtn} style={{backgroundColor:"yellow", color:"black", borderRadius:13}} variant="contained">Login</Button>

    </div>
    
  )
}
