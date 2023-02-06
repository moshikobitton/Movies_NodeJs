import {Card,CardHeader,CardMedia,Box,Button,CardContent,IconButton,Modal} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState, useContext } from "react";
import { TabContext } from "./TabContext";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const apiUrl = 'http://localhost:5003';

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

export default function Movie(props) {
  const [name, setName] = useState("Not available.");
  const [date, setDate] = useState("Not available.");
  const [rating, setRating] = useState("Not available.");
  const [genres, setGenres] = useState("Not available.");
  const [genresToDB, setGenresToDB] = useState("Not available.");
  const [overview, setOverview] = useState("Not available.");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const {value, setValue, login, setLogin, setToggle} = useContext(TabContext);
  const navigate = useNavigate();


  const addMovieBtn = () => {
    if(login.user.id === 0)
      return Swal.fire({
          icon: "info",
          title: 'You need to login!',
          showCancelButton: true,
          confirmButtonText: 'Login',
        }).then((result) => {
          if (result.isConfirmed) 
            navigate( '/' + 'http://localhost:5003/Login');
        })
    let movie = {
      Id: props.id,
      Name: name,
      Genre: genresToDB,
      Publish: date,
      Avg_sc: rating,
      Src: props.img,
      Descr: overview
  }

    fetch(apiUrl + `/addMovie`, {
        method: 'POST',
        body: JSON.stringify(movie),
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
            let movieUser = { IdC: login.user.id, IdM: props.id};
            fetch(apiUrl + `/addMovieToCompany`, {
              method: 'POST',
              body: JSON.stringify(movieUser),
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
                      icon: result.type,
                      text: result.message,
                    });
                },
                (error) => {
                  console.log("err POST=", error);
                });
          },
          (error) => {
            console.log("err POST=", error);
          });
  }

  const deleteMovieBtn = () => {
    if(login.user.id === 0)
      return Swal.fire({
          icon: "info",
          title: 'You need to login!',
          showCancelButton: true,
          confirmButtonText: 'Login',
        }).then((result) => {
          if (result.isConfirmed) 
            navigate( '/' + 'http://localhost:5003/Login');
        })
        Swal.fire({
          icon: "info",
          title: 'Are you sure?',
          showCancelButton: 'No',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed)
          fetch(apiUrl + `/deleteMovieFromCompany/${login.user.id}/${props.id}`, {
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
                console.log("err POST=", error);
              });
        })
  }


  const getDetails = () => {
    fetch(apiUrl + `/getMovieByIdFromApi/${props.id}`, {
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
            if (result.genres !== undefined){
              let genresStr = result.genres.map((g) => <span key={g.id} style={{color:"black", borderRadius:15,margin:"auto",backgroundColor:"yellow"}}>&nbsp;{g.name.replace(" ","&")}&nbsp;</span> );
              let genresToDBStr = result.genres.map((g => g.name));
              setGenresToDB(genresToDBStr);
              setGenres(genresStr);
            }
            if (result.title !== "") setName(result.title);
            if (result.release_date !== "") setDate(result.release_date);
            if (result.overview !== "") setOverview(result.overview);
            if (result.vote_average !== "") setRating(result.vote_average);
          },
          (error) => {
            console.log("err GET=", error);
          });
    setOpen(true)
  }

  return (
    <div style={{display:"inline-block", margin:3}}>
      <div onClick={getDetails} style={{ width: "fit-content",display:"inline-block" }}>
        <Card style={{ borderRadius: 15 }} sx={{ maxWidth: 200, height: 300 }}>
          <CardMedia component="img" image={props.img} alt={name} />
        </Card>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
        <Card
          style={{
            backgroundColor: "black",
            color: "yellow",
          }}
        >
          <CardHeader title={name} />

          <CardContent style={{ textAlign: "left", width: "98%"}}>
            Rating : {rating}  <br /><br />
            Date release : {date} <br /><br />
            Genres : {genres}<br /><br />
            Overview : {overview}<br /><br />
            
          </CardContent>
            {props.search ? <IconButton onClick={addMovieBtn}><FavoriteIcon style={{color:"yellow"}} /></IconButton> : <IconButton onClick={deleteMovieBtn}><DeleteOutlineIcon style={{color:"yellow"}} /></IconButton>}
            
              <Button style={{color:"yellow"}} onClick={handleClose}>Close</Button>
        </Card>
        </Box>
      </Modal>
    </div>
  );
}
