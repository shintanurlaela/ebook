import React from "react";
import {useNavigate} from 'react-router-dom'

// class Home extends React.Component {
//   render() {
//     const navigate = useNavigate()
//     return (
//         <div className="hero">
//           <h2>Welcome To Home Page</h2>
//           <button onClick={()=> Navigate('/skills')}>PAGE SKILLS</button>
//       </div>
//     );
//   }
// }

const Home = () => {
  const navigate = useNavigate()
  return(
    <div className="hero">
        <h2>Welcome To Home Page</h2>
        <div className="pencet2"> 
          <button onClick={()=> navigate('/skills')}>PAGE SKILLS</button>
        </div>
     </div>
  )
}

export default Home;
