import {useContext, useEffect, useState} from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {TabContext} from '../Components/TabContext';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';

import {TextField,Box,Button,NativeSelect,Modal} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height:"80%",
  bgcolor: 'black',
  border: '2px solid yellow',
  borderRadius:10,
  boxShadow:24,
  p: 3,
  color:"yellow",
  overflow:"auto",
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px yellow'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'yellow'
  }
};

const apiUrl = "http://localhost:5003";

export default function Companies() {
  const {setValue, toggle, setToggle, login} = useContext(TabContext);
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [cinemas, setCinemas] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [strCountry, setStrCountry] = useState("");
  const [strYear, setStrYear] = useState("");
  const handleClose = () => setOpen(false);

  //DataTable columns->
  const columns = [
    {
        name: 'Actions',
        selector: 
        row => 
        <div> 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <DeleteOutlineIcon onClick={
            ()=>
            {
              Swal.fire({
                icon: "info",
                title: 'Are you sure?',
                showCancelButton: 'No',
                confirmButtonText: 'Yes',
              }).then((result) => {
                if (result.isConfirmed)
                fetch(apiUrl + `/deleteCompany/${row.id}`, {
                  method: 'DELETE',
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
                      Swal.fire({
                        icon: "success",
                        text: result.message,
                      });
                      setToggle((prev) => !prev);
                    },
                    (error) => {
                      console.log("err DELETE=", error);
                    });
              })
  
          }} />  
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <EditIcon onClick={()=>
          {
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
                },
                (error) => {
                  console.log("err GET=", error);
                });

            let currentYear = new Date().getFullYear();
            let arrayYear = [...Array(100).keys()];
            let str = arrayYear.map((val) => <option key={val} value={currentYear - val}>{currentYear - val}</option>);
            setStrYear(str);
            setId(row.id);
            setUsername(row.username);
            setPassword(row.password);
            setCompany(row.compName);
            setCinemas(row.numCinemaOwns);
            setYear(row.established);
            setCountry(row.oprCountry);
            setOpen(true);
          }}/> 
        
        </div>,
    },
    {
        name: 'Username',
        selector: row => row.username,
        sortable: true
    },
    {
        name: 'Password',
        selector: row => row.password,
        sortable: true
    },
    {
        name: 'Company Name',
        selector: row => row.compName,
        sortable: true
    },
    {
        name: 'Cinemas',
        selector: row => row.numCinemaOwns,
        sortable: true
    },
    {
        name: 'Year Established',
        selector: row => row.established,
        sortable: true
    },
    {
        name: 'Country',
        selector: row => row.oprCountry,
        sortable: true
    },
  ];


  const updateCompanyBtn = () => {

    let companytoSave = {
      Id : id,
      UserName: username,
      Password: password,
      CompName: company,
      OprCountry: country,
      NumCinemaOwns: cinemas,
      Established: year
    }
    console.log(companytoSave);
    
    fetch(apiUrl + `/updateCompany`, {
      method: 'PUT',
      body: JSON.stringify(companytoSave),
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
          console.log(result);
          Swal.fire({
              icon: "success",
              text: result.message,
            });
            setToggle((prev) => !prev);
            handleClose();
        },
        (error) => {
          console.log("err POST=", error);
        });

  }

  useEffect(() => {
    setValue(3);
    if(login.user.id === 0) return;
    fetch(apiUrl+`/getCompanies`, {
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
          setData(result.results.recordset);
        },
        (error) => {
          console.log("err GET=", error);
        });
  }, [toggle]);

  return (
    <div style={{ fontSize: 20, padding: 10, color: "yellow" }}>
      <h1> Companies </h1>
      <DataTable
      style={{color:"yellow", backgroundColor:"black"}}
            columns={columns}
            data={data}
            title="Users"
            pagination
            dense
        />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
        <label>Username : </label><br />
        <TextField
          value={username}
          style={{backgroundColor:"white", borderRadius:10, paddingLeft:10}}
          sx={{ m: 1, width: '25ch' }}
          placeholder="Username"
          variant="standard"
          onChange={(e) => setUsername(e.target.value)}/>
        <br /><br />

        <label>Password : </label><br />
        <TextField
          value={password}
          style={{backgroundColor:"white", borderRadius:10, paddingLeft:10}}
          sx={{ m: 1, width: '25ch' }}
          placeholder="Password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}/>
        <br /><br />

        <label>Company Name : </label><br />
        <TextField
          value={company}
          style={{backgroundColor:"white", borderRadius:10, paddingLeft:10}}
          sx={{ m: 1, width: '25ch' }}
          placeholder="Company name"
          variant="standard"
          onChange={(e) => setCompany(e.target.value)}/>
        <br /><br />

        <label>Cinemas I own: </label><br />
        <TextField
          value={cinemas}
          style={{backgroundColor:"white", borderRadius:10, paddingLeft:10}}
          sx={{ m: 1, width: '25ch' }}
          placeholder="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          onChange={(e) => setCinemas(e.target.value)}/>
        <br /><br />

        <label>Operation Country: </label><br />
        <NativeSelect
          value={country}
          style={{backgroundColor:"white", borderRadius:10, paddingLeft:6}}
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
        <Button onClick={updateCompanyBtn} style={{backgroundColor:"yellow", color:"black", borderRadius:13}} variant="contained">Save</Button>
        &nbsp;
        <Button onClick={handleClose} style={{backgroundColor:"yellow", color:"black", borderRadius:13}} variant="contained">Cancel</Button>
        </Box>
      </Modal>
    </div>
  )
}
