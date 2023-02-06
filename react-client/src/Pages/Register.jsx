import {useState, useEffect, useContext} from "react";
import {IconButton, Input, TextField, InputAdornment,FormControl,Button,NativeSelect} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {TabContext} from '../Components/TabContext';

const apiUrl = "http://localhost:5003";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [cinemas, setCinemas] = useState('');
  const [country, setCountry] = useState("Israel");
  const [year, setYear] = useState("");
  const [strCountry, setStrCountry] = useState("");
  const [strYear, setStrYear] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  var cou = "";
  const {setValue} = useContext(TabContext);

  useEffect(() => {
    setValue(4);    
    fetch(`https://restcountries.com/v2/all`, {
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
            let str = result.map((cou, index) => <option key={index} value={cou.name}>{cou.name}</option>)
            setStrCountry(str);
            cou = result[0].name;
            setCountry(cou);
          },
          (error) => {
            console.log("err GET=", error);
          });

    let currentYear = new Date().getFullYear();
    setYear(currentYear);
    let arrayYear = [...Array(100).keys()];
    let str = arrayYear.map((val) => <option key={val} value={currentYear - val}>{currentYear - val}</option>)
    setStrYear(str);
  }, []);

  const postBtn = () => {
    if(username === '' || password === '' || company === '' || cinemas === '' || cinemas < 0)
      return;
      
    let user = { UserName:username, Password:password, CompName: company, OprCountry:country, NumCinemaOwns:cinemas, Established:year};
    fetch(apiUrl + `/addCompany`, {
        method: 'POST',
        body: JSON.stringify(user),
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
            clearBtn();
          },
          (error) => {
            console.log("err POST=", error);
          });
  };

  const clearBtn = () => {
    setUsername("");
    setPassword("");
    setCompany("");
    setCinemas("");
    setCountry(cou);
    setYear(new Date().getFullYear());
  }
  

  return (
    <div style={{ color:"yellow",fontSize: 20, padding: 10 }}>
            <div style={{fontSize: 20 , padding:10, color:"yellow"}}>
      <h1> Register </h1><br />

      <label>Username : </label><br />
      <TextField
        value={username}
          style={{backgroundColor:"white", borderRadius:10, paddingLeft:10, paddingRight:10}}
          sx={{ m: 1, width: '25ch' }}
          placeholder="  Username"
          variant="standard"
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />

        <label>Password : </label><br />
      <FormControl style={{backgroundColor:"white", borderRadius:10,paddingLeft:10, paddingRight:10}} sx={{width: '25ch'}} variant="standard">
          <Input
            value={password}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl><br /><br />

        <label>Company Name : </label><br />
      <TextField
          value={company}
          style={{backgroundColor:"white", borderRadius:10, paddingLeft:10, paddingRight:10}}
          sx={{ m: 1, width: '25ch' }}
          placeholder="  Company name"
          variant="standard"
          onChange={(e) => setCompany(e.target.value)}
        />      <br /><br />
        <label>Cinemas I own: </label><br />
        <TextField
        value={cinemas}
          style={{backgroundColor:"white", borderRadius:10, paddingLeft:10, paddingRight:10}}
          sx={{ m: 1, width: '25ch' }}
          placeholder="  Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          onChange={(e) => setCinemas(e.target.value)}
        /><br /><br />

        <label>Operation Country: </label><br />
        <NativeSelect
        value={country}
        style={{backgroundColor:"white", borderRadius:10, paddingLeft:6, paddingRight:6}}
        sx={{ m: 1, width: '35ch' }}
        onChange={(e) => setCountry(e.target.value)}
        >
        {strCountry}
        </NativeSelect>

        <br /><br />
        <label>Year Established: </label><br />
        <NativeSelect
        value={year}
        style={{backgroundColor:"white", borderRadius:10, paddingLeft:6}}
        sx={{ m: 1, width: '35ch' }}
        onChange={(e) => setYear(e.target.value)}
        >
        {strYear}
        </NativeSelect>

        <br /><br />
        <Button onClick={postBtn} style={{backgroundColor:"yellow", color:"black", borderRadius:13}} variant="contained">Sign Up</Button>
        &nbsp;
        <Button onClick={clearBtn} style={{backgroundColor:"yellow", color:"black", borderRadius:13}} variant="contained">Clear</Button>

    </div>
    </div>
  );
}
