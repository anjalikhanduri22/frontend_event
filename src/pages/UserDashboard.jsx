import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { addRequests } from '../utils/adminRequestSlice';
import EventList from "../components/EventList";


const UserDashboard = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
 
  

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
      console.log(err);
    }
  };

  const sendAdminRequest = async ()=>{
    
    try{
      const res = await axios.post("http://localhost:3000/send/adminRequest",{},{ withCredentials: true });
      dispatch(addRequests(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

    }catch(error){
      
      console.log(error.response.data);
    }
    
  }


  
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">User Dashboard</a>
        </div>
        <div className="flex-none">
       
          <ul className="menu menu-horizontal px-1">
                  
                  <li><a onClick={sendAdminRequest}>Request For Admin</a></li>
                  
                  <li><Link to ="/user/events/all">All Events</Link></li>
                  <li><Link to ="/user/bookings">Show My Bookings</Link></li>
                  <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
        </div>
      </div>
      
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span> Admin request sent successfully.</span>
          </div>
        </div>
      )}

      
      <Outlet />
     
    </div>
  )
}

export default UserDashboard