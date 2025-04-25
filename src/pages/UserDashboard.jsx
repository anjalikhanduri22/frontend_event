import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";


const UserDashboard = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">User Dashboard</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
                  <li><Link to ="/user/events/all">All Events</Link></li>
                  <li><Link to ="">Request For Admin</Link></li>
                  <li><Link to ="/user/bookings">Show My Bookings</Link></li>
                  <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default UserDashboard