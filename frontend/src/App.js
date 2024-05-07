import React from "react";
import First from "./First";
import Navbar from "./Pages/Navbar";

class App extends React.Component{
   render(){
    return(
      <div>
        <Navbar/>
        <p><First/></p>
      </div>
    )
   }
}

export default App