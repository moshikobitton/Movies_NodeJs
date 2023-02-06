import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Search from './Pages/Search';
import Companies from './Pages/Companies';
import Login from './Pages/Login';
import Favories from './Pages/Favories';
import Register from './Pages/Register';
import HomePage from './Pages/HomePage';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useContext } from 'react';
import {TabContext} from './Components/TabContext';
import Swal from 'sweetalert2';


const apiUrl = "http://localhost:5003";

function App() {
  const navigate = useNavigate();
  const {value, setValue, login, setLogin} = useContext(TabContext);
  const logoutBtn= ()=> {
    Swal.fire({
      icon: "info",
      title: 'Are you sure?',
      showCancelButton: 'No',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed){
        setLogin({logIn:"", logOut:"none", user:{id:0,username:"Guest",type:'C'}});
        navigate( "/" +apiUrl + '/');
      }
    })
  }

  return (
    <div className="App">

      <Box sx={{ width: '100%', bgcolor: 'black' }}>
        <Tabs value={value} centered>
          <Tab onClick={()=> { navigate( apiUrl + '/');setValue(0);}} style={{height:"100%",marginLeft:"2%", backgroundColor:"yellow",color:"black",padding:12,borderRadius:10,display:"flex", alignItems:"center"}} label={"Hi "+login.user.username} />
          <Tab style={{ color: 'yellow' }} onClick={()=>navigate( apiUrl + '/Search')} label="Search" />
          <Tab style={{ color: 'yellow', display:login.logOut }} onClick={()=>navigate( apiUrl + '/Favories')} label="Favories" />
          <Tab style={{ color: 'yellow', display:login.user.type === 'C' ? "none" : "" }} onClick={()=>navigate( apiUrl + '/Companies')} label="Companies" />
          <Tab style={{ color: 'yellow' }} onClick={()=>navigate( apiUrl + '/Register')} label="Register" />
          <Tab style={{ color: 'yellow', display:login.logIn }} onClick={()=>navigate( apiUrl + '/Login')} label="Login" />
          <Tab style={{ color: 'yellow', display:login.logOut }} onClick={logoutBtn} label="Logout" />
        </Tabs>
      </Box>
      <header>
        <Routes>
          <Route path={apiUrl + "/"} element={<HomePage/>} />
          <Route path={apiUrl + "/Search"} element={<Search/>} />
          <Route path={apiUrl + "/Favories"} element={<Favories/>} />
          <Route path={apiUrl + "/Companies"} element={<Companies/>} />
          <Route path={apiUrl + "/Register"} element={<Register/>} />
          <Route path={apiUrl + "/Login"} element={<Login/>} />
        </Routes>
      </header>

      
    </div>
  );
}

export default App;
