import React from "react";
import {Routes, Route} from 'react-router-dom'

import Home from "./Pages/Home";
import About from "./Pages/About";
import Notfound from "./Pages/NotFound";
import Book from './Pages/Book';
import User from "./Pages/User";


const First = () => {
    return(
        <Routes>  
            <Route exact path ="/" Component={Home} />
            <Route path="/book" Component={Book}/>
            <Route path ="/about" Component={About} />
            <Route path ="/user" Component={User} />
            <Route path ="*" Component={Notfound} />
        </Routes>
    )
}

export default First