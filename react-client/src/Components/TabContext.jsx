import React, { useState, createContext } from 'react'

export const TabContext = createContext();

export default function TabContextProvider(props) {
  const [value, setValue] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [login, setLogin] = useState({logIn:"", logOut:"none", user:{id:0,username:"Guest",type:'C'}});
  return(
    <TabContext.Provider value={{login, setLogin, value, setValue, toggle, setToggle}}>
      {props.children}
    </TabContext.Provider>
  )
}
