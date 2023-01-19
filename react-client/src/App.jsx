import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Search from './Pages/Search';
import Companies from './Pages/Companies';
import Login from './Pages/Login';
import Library from './Pages/Library';
import Register from './Pages/Register';
import HomePage from './Pages/HomePage';

const apiUrl = "http://localhost:5003";

const style = {margin:10, textDecorationLine:"none" , fontWeight:"bold", color:"black",backgroundColor:"yellow",borderRadius:25,padding:10};

function App() {
  return (
    <div style={{color:'yellow'}} className="App">
      <div style={{ margin: 20, fontSize: 25 , padding:5}}>
        <Link style={style} to={apiUrl + "/Search"}>Search</Link> 
        <Link style={style} to={apiUrl + "/Library"}>Library</Link> 
        <Link style={style} to={apiUrl + "/Companies"}>Companies</Link> 
        <Link style={style} to={apiUrl + "/Register"}>Register</Link> 
        <Link style={style} to={apiUrl + "/Login"}>Login</Link> 
      </div>

      <header>
        <Routes>
          <Route path={apiUrl + "/"} element={<HomePage/>} />
          <Route path={apiUrl + "/Search"} element={<Search/>} />
          <Route path={apiUrl + "/Library"} element={<Library/>} />
          <Route path={apiUrl + "/Companies"} element={<Companies/>} />
          <Route path={apiUrl + "/Register"} element={<Register/>} />
          <Route path={apiUrl + "/Login"} element={<Login/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
