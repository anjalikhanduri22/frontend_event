import React ,{ useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import {addUser} from "../utils/userSlice";

const ShowCustomers = () => {

  const users = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/view/allusers",{
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));

    }catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
  
    fetchUsers();
    }, []);

    



  return (
    <div >
      <h2 className='text-center'>All Registered Users</h2>
    
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-300 m-3" >

     <table className="table-md">
<thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
  
    <tbody>
    {Array.isArray(users) && users.length > 0 ? 
    (users.map((user) => (
        
     
        <tr key={user._id}>
        <th>{user._id}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
      </tr>
    ))
  ):(
    <tr>
          <td colSpan="4">No users found.</td>
        </tr>

  )}
    </tbody>
    </table>
    </div>

    </div>
  )
}

export default ShowCustomers