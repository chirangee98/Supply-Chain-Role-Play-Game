import React, { useState, useEffect } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import RegAdmin from './admin/RegAdmin'
// import SignUp from './SignUp';
import { useLocation } from 'react-router-dom';
import PlaceOrderForm from './PlaceOrderForm';
import axios from "axios";
import ViewOrder from './ViewOrder';
import Received from './Received';
import UserManagement from './admin/UserManagement';
import AllGames from './admin/AllGames';
// import { useUser } from '../assets/Context/userContext';
import { NavLink, useNavigate } from "react-router-dom";
import StartGame from './admin/StartGame';
import StartGameForm from './admin/StartGameForm';
import ActiveGame from './user/ActiveGame';
import CompletedGame from './user/CompleteGame';
import UserGameDashboard from './user/UserGameDashboard';
import GameData from './user/GameData';
import AdminActivegame from './admin/AdminActivegame';
import AdminCompleteGame from './admin/AdminCompleteGame';
import AdminGameDashboard from './admin/AdminGameDashboard';




const Home = () => {
   // const { isLoggedIn, user } = useUser();
   const [activeButton, setActiveButton] = useState('index');
    const navigate = useNavigate();
    const [distributors, setDistributors] = useState([]);
    const [name, setUserName] = useState("");
    const [userType, setUserType] = useState("");
    const [userid, setUserId] = useState("");
    const [gameid, setGameid] = useState("");
    useEffect(() => {
        if(localStorage.getItem('userid')===null){
          navigate("/");
        }else{
          
          setUserId(localStorage.getItem('userid'));
          setUserType(localStorage.getItem('usertype'));
          fetchUser(); // Fetch distributors when the component mounts
          {localStorage.getItem('usertype') === "admin"|| localStorage.getItem('usertype') === "SuperAdmin"? "": fetchDistributors();} // Fetch distributors when the component mounts
        }
           
    },[]); // Trigger effect when isLoggedIn or user changes

    const handleClick = (buttonName) => {
      setActiveButton(buttonName);
    };
    
   const handleGame=(gameid,buttonName)=>{
     setGameid(gameid);
     setActiveButton(buttonName);
   }

   const handleAdminActiveGame=(gameid)=>{
    console.log(gameid);
     setGameid(gameid);
     setActiveButton('admingamedashboard');
   }

   const handleUserCompleteGame=(gameid)=>{
    console.log(gameid);
     setGameid(gameid);
     setActiveButton('gamedata');
   }


    // Function to fetch distributors based on userType
    const fetchDistributors = async () => {
      //console.log("called");
      try {
          // Make API request to fetch distributors based on userType
          // console.log(userType);
          const response = await axios.get(`http://localhost:3000/entities`,{
            params:{
              userType:localStorage.getItem('usertype')
            }
          });
          // console.log(response);
          setDistributors(response.data); // Set the fetched distributors in state

      } catch (error) {
          console.error('Error fetching distributors:', error);
      }
    };
    const fetchUser = async () => {
      try {
          // Make API request to fetch distributors based on userType
          // console.log(userid);
          // const response = await axios.get(`http://localhost:3000/auth/fetchuser/${userid}`);
          //console.log(userType);
          const response = await axios.post("http://localhost:3000/auth/fetchuser", {
             userid:localStorage.getItem('userid')
           });
          setUserName(response.data.name);
          setUserType(response.data.userType);
          setUserId(response.data._id); 
      } catch (error) {
          console.error('Error fetching user:', error);
      }
    };

    // useEffect(() => {
    //     fetchDistributors(); // Fetch distributors when the component mounts
    // }, []); // Empty dependency array ensures the effect runs only once

  return (
    
    <div className="flex flex-col h-screen bg-gray-100">
        <Header  username={name} usertype={userType} />
        <main className="flex flex-grow overflow-y-auto px-4 py-4">
            <Sidebar name={name} userType={userType} userId={userid} handleClick={handleClick}/>
            <div className=" flex-grow bg-white shadow-md rounded-md px-4 py-4 overflow-y-auto">
                
               {userType==="admin" || userType==="SuperAdmin"? 
                <div>
                    {/* <UserManagement/> */}
                    {/* {activeButton === 'startgame' && < StartGame />} */}
                    {activeButton === 'userlist' && <UserManagement  />}
                    {activeButton === 'viewgame' && <AllGames  />}
                    {activeButton === 'regadmin' && <RegAdmin  />}
                    {activeButton === 'index' && <StartGameForm  />}
                    {activeButton === 'adminactivegame' && <AdminActivegame handleAdminActiveGame={handleAdminActiveGame} />}
                    {activeButton === 'admincompletegame' && <AdminCompleteGame handleAdminActiveGame={handleAdminActiveGame} />}
                    {activeButton === 'admingamedashboard' && <AdminGameDashboard handleClick={handleClick} gameid={gameid} />}
                    {/* {activaBustton === ''} */}
                </div>
                :<div>
                    {activeButton === 'placeorder' && <PlaceOrderForm  mx-auto distributors={distributors} userId={userid} /> }
                    {activeButton === 'vieworder' &&  <ViewOrder  userId={userid} />}
                    {activeButton === 'index' && <ActiveGame  handleGame={handleGame}/>}
                    {activeButton === 'completedgames' && <CompletedGame  handleUserCompleteGame={handleUserCompleteGame}/>}
                    {activeButton === 'usergamedashboard' && <UserGameDashboard handleClick={handleClick} gameid={gameid} />}
                    {activeButton === 'gamedata' && <GameData handleClick={handleClick} gameid={gameid} />}
                </div>

               }
                
                             
            </div>
        </main>
    </div>
  )
}

export default Home